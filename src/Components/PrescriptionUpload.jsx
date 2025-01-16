import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mantine/core';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { API_HOST } from '../config/config';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const SortableItem = ({ id, preview }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="col-4 col-lg-3 mb-4" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="card">
                <img src={preview} alt={`Preview ${id}`} className="card-img-top" loading="lazy" />
                <div className="card-footer">Page : {id + 1}</div>
            </div>
        </div>
    );
};

const PrescriptionUpload = (props) => {
    const { type, text, isLoading, setIsLoading, order_no = '' } = props;
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure();
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [prescriptionRequired, setPrescriptionRequired] = useState(false);
    const [prescription, setPrescription] = useState(null);
    const [instructions, setInstructions] = useState('');
    const [hasAddress, setHasAddress] = useState(false);
    const fileInputRef = useRef();

    useEffect(() => {
        if (user && user.addresses && user.addresses.length > 0) {
            setHasAddress(true);
        }
    }, [user]);

    useEffect(() => {
        if (type === 'pending') {
            const cart_items = cart.filter(item => item.product.prescription === 1);
            const reqP = cart_items.length > 0;
            if (reqP) {
                setPrescriptionRequired(true);
                getPrescription();
            } else {
                setPrescriptionRequired(false);
                setPrescription([]);
                setInstructions('');
            }
        }
    }, [type]);

    const getPrescription = () => {
        const token = localStorage.getItem('token');
        axios
            .get(`${API_HOST}/prescription/getPendingItem`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setPrescription(res.data);
                if (res.data?.instructions) {
                    setInstructions(res.data?.instructions);
                }
            })
            .catch((err) => {
                console.error('Fetch error:', err.message);
            });
    };

    const handleDrop = async (event) => {
        const files = Array.from(event.target.files);
        const compressedFiles = await Promise.all(
            files.map(async (file) => {
                if (file.size > 500 * 1024) {
                    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 800, useWebWorker: true };
                    return await imageCompression(file, options);
                }
                return file;
            })
        );

        const previewUrls = compressedFiles.map((file) => URL.createObjectURL(file));
        setImages([...images, ...compressedFiles]);
        setPreviews([...previews, ...previewUrls]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!hasAddress) {
            if (window.confirm('You will need to add a delivery address. Are you sure you want to add an address?')) {
                navigate('/delivery-address');
            }
            close();
            return false;
        }

        const token = localStorage.getItem('token');
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images[]', image);
        });
        if (type === 'assigned') {
            formData.append('order_no', order_no);
        }
        if (instructions) {
            formData.append('instructions', instructions);
        }
        formData.append('status', type);

        setIsLoading(true);

        try {
            await axios.post(`${API_HOST}/prescription/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            getPrescription();
            close();
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setIsLoading(false);
            if (type === 'unassigned') {
                props.reload();
            }
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setPreviews((prev) => {
                const oldIndex = prev.indexOf(active.id);
                const newIndex = prev.indexOf(over.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    if (type === 'pending' && !prescriptionRequired) return <p>Not required.</p>;

    return (
        <>
            <div>
                <button onClick={open} className="btn btn-danger btn-sm">
                    {text || (prescription ? 'Change' : 'Upload')}
                </button>
            </div>

            <Modal opened={opened} onClose={close} fullScreen>
                <div className="container mb-4 mt-12">
                    <div
                        onClick={() => fileInputRef.current.click()}
                        style={{ border: '1px dashed gray', textAlign: 'center', padding: '20px', width: '100%' }}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleDrop}
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                        />
                        <p>Click to select prescription</p>
                    </div>

                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={previews} strategy={verticalListSortingStrategy}>
                            <div className="row mt-4">
                                {previews.map((preview, index) => (
                                    <SortableItem key={index} id={index} preview={preview} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    {previews.length > 0 && (
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="Instructions"
                            className="form-control mt-3"
                        />
                    )}

                    <div className="d-flex justify-content-end mt-4">
                        {previews.length > 0 && (
                            <button onClick={handleUpload} disabled={isLoading} className="btn btn-primary btn-sm">
                                Confirm Upload
                            </button>
                        )}
                        <button onClick={close} className="btn btn-secondary ms-3 btn-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PrescriptionUpload;
