import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Modal } from '@mantine/core';
import { API_HOST, STORAGE_PATH } from '../config/config';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ShowPrescription from './ShowPrescription';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SortableItem = ({ id, preview }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="col-4 col-lg-3 mb-4" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="card">
                <img src={preview} alt={`Preview ${id}`} className="card-img-top" loading="lazy"/>
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
        axios.get(`${API_HOST}/prescription/getPendingItem`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then(res => {
            setPrescription(res.data);
            if(res.data?.instructions){
                setInstructions(res.data?.instructions);
            }
        }).catch(err => {
            console.error('Fetch error:', err.message);
        });
    };

    const onDrop = async (acceptedFiles) => {
        const compressedFiles = await Promise.all(acceptedFiles.map(async (file) => {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };
            return await imageCompression(file, options);
        }));

        const previewUrls = compressedFiles.map(file => URL.createObjectURL(file));
        setImages([...images, ...compressedFiles]);
        setPreviews([...previews, ...previewUrls]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 10,
    });

    const noDeliveryAddress=()=>{
        if(user.addresses && user.addresses.length > 0){
            return false;
        }
        return true;
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if(noDeliveryAddress){
            if(confirm('You will need to add a delivery address. Are you sure you want to add an address?')){
                navigate('/delivery-address');
            }
            return false;
        }

        const token = localStorage.getItem('token');
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images[]', image);
        });
        if (type == 'assigned') {
            formData.append('order_no', order_no);
        }
        if (instructions) {
            formData.append('instructions', instructions);
        }
        formData.append('status', type);

        setIsLoading(true);

        try {
            const res = await axios.post(`${API_HOST}/prescription/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload successful:', res.data);
            getPrescription();
            close();
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setIsLoading(false);
            if (type == 'unassigned') {
                props.reload();
            }
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id != over.id) {
            setPreviews((prev) => {
                const oldIndex = prev.indexOf(active.id);
                const newIndex = prev.indexOf(over.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    if (type == 'pending' && !prescriptionRequired) return (<p>Not required.</p>);

    return (
        <>
            {type == 'pending' && (
                <div className='d-flex justify-content-between'>
                    {prescription &&
                        <p>Already uploaded <ShowPrescription type={'span'} text='View Prescription' code={prescription.group_code} /> </p>
                    }
                    <div>
                        <button onClick={open} className='btn btn-danger btn-sm'>
                            {text ? text : prescription ? 'Change' : 'Upload'}
                        </button>
                    </div>
                </div>
            )}
            {type == 'unassigned' && (
                <div className='d-flex justify-content-center'>

                    <button onClick={open} className='btn btn-danger'>
                        {text ? text : prescription ? 'Change' : 'Upload'}
                    </button>
                </div>
            )}
            {type == 'assigned' && (
                <div>
                    <button onClick={open} className='btn btn-danger btn-sm'>
                        {text ? text : 'Upload'}
                    </button>
                </div>
            )}

            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
                style={{ position: 'relative', zIndex: 9999999 }}>
                <div className='container mb-4 mt-12'>
                    <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed gray', textAlign: 'center', padding: '20px', width: '100%' }}>
                        <input {...getInputProps()} />
                        <p>Click to select prescription</p>
                    </div>
                    {isLoading && <p>Uploading...</p>}
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={previews} strategy={verticalListSortingStrategy}>
                            <div className="row mt-4">
                                {previews.map((preview, index) => (
                                    <SortableItem key={index} id={index} preview={preview} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                    {previews.length >0 ?(
                        <div className="w-full my-3">
                            <textarea
                                value={instructions}
                                onChange={e=>setInstructions(e.target.value)}
                                placeholder='Instructions'
                                cols="30"
                                rows="10">
                            </textarea>
                        </div>
                    ):null}
                    <div className="d-flex justify-content-end mt-4">
                        {previews.length > 0 &&
                            <button onClick={handleUpload} disabled={isLoading} className='btn btn-primary btn-sm'>Confirm Upload</button>
                        }
                        <button onClick={close} className='btn btn-secondary ms-3 btn-sm'>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PrescriptionUpload;
