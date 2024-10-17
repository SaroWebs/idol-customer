import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_HOST } from "../config/config";
import { useNavigate } from "react-router-dom"; // Add this import

const DeliveryAddressModal = (props) => {
    const { text, fetchAddresses, addressList, setAddressList } = props;
    const [activeType, setActiveType] = useState(props.type);
    const [opened, { open, close }] = useDisclosure();
    

    const [formInfo, setFormInfo] = useState({
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        pin: '',
        type: 'home' // Add default type
    });



    const activateAddress = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_HOST}/address/${id}/activate`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                throw new Error('Failed to activate address');
            }
            console.log(response.data);
            setAddressList(prev => prev.map(addr => ({
                ...addr,
                active: addr.id === id ? 1 : 0 // Set active state
            })));
            close();
        } catch (error) {
            console.error('Error activating address:', error);
        }
    }

    const pinValidation = async (pin) => {
        if (!/^\d{6}$/.test(pin)) {
            return false;
        }
        try {
            const response = await axios.get(`${API_HOST}/pin/check?pin=${pin}`);
            return true;
        } catch (error) {
            console.error('Error validating PIN:', error);
            return false;
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInfo(prev => ({ ...prev, [name]: value }));
    }

    const addNewAddress = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!(await pinValidation(formInfo.pin))) {
            alert('Invalid PIN code');
            return;
        }
        try {
            const response = await axios.post(`${API_HOST}/deliveryaddress/store`, formInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Check for success response
            if (response.status === 200) {
                // Fetch updated address list
                await fetchAddresses();
                // Reset form
                setFormInfo({
                    address_line_1: '',
                    address_line_2: '',
                    city: '',
                    state: '',
                    pin: '',
                    type: 'home'
                });
                setActiveType('select');
            } else {
                console.error('Failed to add new address:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new address:', error);
            alert('Failed to add new address');
        }
    }

    const updateAddress = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!(await pinValidation(formInfo.pin))) {
            alert('Invalid PIN code');
            return;
        }
        try {
            const response = await axios.put(`${API_HOST}/deliveryaddress/${formInfo.id}/update`, formInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setAddressList(prev => prev.map(addr => addr.id === formInfo.id ? response.data : addr));
            setActiveType('select');
            setFormInfo({
                address_line_1: '',
                address_line_2: '',
                city: '',
                state: '',
                pin: '',
                type: 'home' // Add default type
            });
        } catch (error) {
            console.error('Error updating address:', error);
            alert('Failed to update address');
        }
    }

    const handleFormSubmit = async (e, submitFunction) => {
        e.preventDefault();
        await submitFunction(e);
        if (!addressList || addressList.length === 0) {
            close();
        } else {
            setActiveType('select');
        }
    };

    // Add this new function
    const handleTypeChange = (newType) => {
        if (newType === 'add') {
            setFormInfo({
                address_line_1: '',
                address_line_2: '',
                city: '',
                state: '',
                pin: '',
                type: 'home' // Add default type
            });
        }
        setActiveType(newType);
    };

    return (
        <>
            <button onClick={open} className="btn btn-warning btn-sm">{text}</button>

            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
                style={{ position: 'relative', zIndex: 9999999 }}>
                {activeType === 'add' && (
                    <div className="">
                        <div className="d-flex mt-4 px-1" style={{ gap: '1.2rem' }}>
                            <div className="back-button" onClick={() => handleTypeChange('select')}></div>
                        </div>
                        <div className="settings-wrapper py-3">
                            <form onSubmit={(e) => handleFormSubmit(e, addNewAddress)} role="form" id="contactForm" data-toggle="validator" className="shake">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        Delivery Address
                                    </div>
                                    <div className="card-body">
                                        {/* Add this new section for address type */}
                                        <div className="mb-3">
                                            <label className="form-label label-size">Address Type</label>
                                            <div className="d-flex">
                                                {['home', 'work', 'other'].map((type) => (
                                                    <div key={type} className="form-check me-3">
                                                        <input
                                                            type="radio"
                                                            id={`type-${type}`}
                                                            name="type"
                                                            value={type}
                                                            checked={formInfo.type === type}
                                                            onChange={handleInputChange}
                                                            className="form-check-input"
                                                        />
                                                        <label className="form-check-label" htmlFor={`type-${type}`}>
                                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-1 col-12">
                                            <label className="form-label label-size">Address Line 1</label>
                                            <textarea name="address_line_1" id="address_line_1" className="form-control" rows="3" value={formInfo.address_line_1} onChange={handleInputChange} required></textarea>
                                        </div>
                                        <div className="mb-1 col-12">
                                            <label className="form-label label-size">Address Line 2</label>
                                            <textarea name="address_line_2" id="address_line_2" className="form-control" rows="3" value={formInfo.address_line_2} onChange={handleInputChange}></textarea>
                                        </div>
                                        <div className="mb-1 col-md-6">
                                            <label className="form-label label-size">City </label>
                                            <input type="text" className="form-control" id="city" name="city" value={formInfo.city} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-1 col-md-6">
                                            <label className="form-label label-size">State</label>
                                            <input type="text" className="form-control" id="state" name="state" value={formInfo.state} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-1 col-md-6">
                                            <label className="form-label label-size">Pincode</label>
                                            <input type="text" className="form-control" id="pin" name="pin" value={formInfo.pin} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <center>
                                            <button type="submit" id="addaddressorder" className="btn btn-danger btn-sm ms-3">Save Address</button>
                                            <button type="button" onClick={() => handleTypeChange('select')} className="btn btn-secondary btn-sm ms-3">Cancel</button>
                                        </center>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {activeType === 'select' && (
                    <div className="">
                        <div className="d-flex mt-4 px-1" style={{ gap: '1.2rem' }}>
                            <div className="back-button" onClick={close}></div>
                        </div>
                        <div className="settings-wrapper py-3">
                            <span id="status"></span>

                            <div className="card settings-card" style={{ marginTop: '10px' }}>
                                <div className="card-header">
                                    <div className="d-flex justify-content-between">
                                        <h6>Your Addresses</h6>
                                        <div>
                                            <button onClick={() => handleTypeChange('add')} className="btn btn-info btn-sm ms-3">Add New</button>
                                            <button onClick={close} className="btn btn-secondary btn-sm ms-3">Close</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {addressList && addressList.map((address, i) => (
                                        <div key={i} className="row mb-3">
                                            <div className="col-2">
                                                <div className="form-check">
                                                    <input
                                                        type='radio'
                                                        checked={address.active === 1}
                                                        onChange={() => activateAddress(address.id)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="address-info">
                                                    <p className="mb-0"><small className="text-muted">Address:</small> {address.address_line_1}</p>
                                                    {address.address_line_2 && <p className="mb-0"><small className="text-muted">Address 2:</small> {address.address_line_2}</p>}
                                                    <p className="mb-0"><small className="text-muted">City:</small> {address.city}, <small className="text-muted">State:</small> {address.state}</p>
                                                    <p className="mb-0"><small className="text-muted">PIN:</small> {address.pin}</p>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <button onClick={() => {
                                                    setFormInfo(address);
                                                    handleTypeChange('edit');
                                                }} className="btn btn-sm btn-outline-primary">Edit</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeType === 'edit' && (
                    <div className="">
                        <div className="d-flex mt-4 px-1" style={{ gap: '1.2rem' }}>
                            <div className="back-button" onClick={() => handleTypeChange('select')}></div>
                        </div>
                        <div className="settings-wrapper py-3">
                            <form onSubmit={(e) => handleFormSubmit(e, updateAddress)} role="form" id="contactForm" data-toggle="validator" className="shake">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        Edit Delivery Address
                                    </div>
                                    <div className="card-body">
                                        {/* Add this new section for address type */}
                                        <div className="mb-3">
                                            <label className="form-label label-size">Address Type</label>
                                            <div className="d-flex">
                                                {['home', 'work', 'other'].map((type) => (
                                                    <div key={type} className="form-check me-3">
                                                        <input
                                                            type="radio"
                                                            id={`edit-type-${type}`}
                                                            name="type"
                                                            value={type}
                                                            checked={formInfo.type === type}
                                                            onChange={handleInputChange}
                                                            className="form-check-input"
                                                        />
                                                        <label className="form-check-label" htmlFor={`edit-type-${type}`}>
                                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-1 col-12">
                                            <label className="form-label label-size">Address Line 1</label>
                                            <textarea name="address_line_1" id="address_line_1" className="form-control" rows="3" value={formInfo.address_line_1} onChange={handleInputChange} required></textarea>
                                        </div>
                                        <div className="mb-1 col-12">
                                            <label className="form-label label-size">Address Line 2</label>
                                            <textarea name="address_line_2" id="address_line_2" className="form-control" rows="3" value={formInfo.address_line_2 ? formInfo.address_line_2 : ''} onChange={handleInputChange}></textarea>
                                        </div>
                                        <div className="mb-1 col-md-6">
                                            <label className="form-label label-size">City </label>
                                            <input type="text" className="form-control" id="city" name="city" value={formInfo.city} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-1 col-md-6">
                                            <label className="form-label label-size">State</label>
                                            <input type="text" className="form-control" id="state" name="state" value={formInfo.state} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-1 col-md-6">
                                            <label className="form-label label-size">Pincode</label>
                                            <input type="text" className="form-control" id="pin" name="pin" value={formInfo.pin} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <center>
                                            <button type="submit" className="btn btn-danger btn-sm ms-3">Update Address</button>
                                            <button type="button" onClick={() => handleTypeChange('select')} className="btn btn-secondary btn-sm ms-3">Cancel</button>
                                        </center>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default DeliveryAddressModal;