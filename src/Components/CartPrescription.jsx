import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { API_HOST, STORAGE_PATH } from '../config/config';
import axios from 'axios';

const CartPrescription = ({ cart }) => {
    const [opened, { open, close }] = useDisclosure();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prescriptionRequired, setPrescriptionRequired] = useState(false);
    const [prescription, setPrescription] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cart_items = cart.filter(item => item.product.prescription === 1);
        const reqP = cart_items.length > 0;
        if (reqP) {
            setPrescriptionRequired(true);
            getPrescription();
        } else {
            setPrescriptionRequired(false);
            setPrescription(null);
        }
    }, []);

    const getPrescription = () => {
        const token = localStorage.getItem('token');
        axios.get(`${API_HOST}/prescription/getPendingItem`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).then(res => {
            setPrescription(res.data);
        }).catch(err => {
            console.error('Fetch error:', err.message);
        });
    };



    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];

        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const previewUrl = URL.createObjectURL(compressedFile);
            setImage(compressedFile);
            setPreview(previewUrl);
        } catch (error) {
            console.error('Error during image compression:', error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const handleUpload = async (e) => { // Changed to async
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', image);
        formData.append('status', 'pending');

        setLoading(true); // Set loading to true

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
            // Handle error
            console.error('Upload error:', err);
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    if (!prescriptionRequired) return (<p>Not required.</p>);
    
    return (
        <>
            {prescription ? (
                <div className='d-flex justify-content-between'>
                    <p>Already uploaded <a href={`${STORAGE_PATH}/${prescription.file_path}`} target='_blank'>View</a></p>
                    <div className="">
                        <button onClick={open} className='btn btn-danger btn-sm'>Update</button>
                    </div>
                </div>
            ) : (
                <div className="">
                    <button onClick={open} className='btn btn-danger btn-sm'>Upload</button>
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
                <div>
                    <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed gray', textAlign: 'center', padding: '20px', width: '100%' }}>
                        <input {...getInputProps()} />
                        <p>Click to select prescription</p>
                    </div>
                    {loading && <p>Uploading...</p>} {/* Loading indicator */}
                    {preview && (
                        <>
                            <div style={{ marginTop: '20px', marginBottom: '1rem' }}>
                                <h4>Preview:</h4>
                                <img src={preview} alt="Preview" style={{ maxWidth: '400px', width: '100%' }} />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button onClick={handleUpload} className='btn btn-primary btn-sm'>Confirm Upload</button>
                                <button onClick={close} className='btn btn-secondary ms-3 btn-sm'>Cancel</button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default CartPrescription

