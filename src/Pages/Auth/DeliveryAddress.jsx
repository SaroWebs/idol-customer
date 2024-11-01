import React, { useState } from "react";
import { Container, Card } from '@mantine/core';
import { Link } from "react-router-dom"; // Import Link for navigation
import MasterLayout from "../../Layouts/MasterLayout";
import { useAuth } from "../../contexts/AuthContext";
import { API_HOST } from "../../config/config";
import axios from "axios";

const addDeliveryAddress = () => {
    const { user } = useAuth();
    const [addressList, setAddressList] = useState(user?.addresses || []);

    console.log(user);


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
    return (
        <MasterLayout title="Your Addresses">
            <Container>
                <Card padding="lg">

                    <div className="settings-wrapper py-3">
                        <span id="status"></span>

                        {/* list of addreses  */}
                        <Link
                            to="/add-delivery-address"
                            className="btn btn-info btn-sm w-full mb-2 bg-blue-500 text-white py-2 rounded text-center"
                        >
                            ADD NEW ADDRESS
                        </Link>

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
                                    {/*  */}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </Container>
        </MasterLayout>
    );
};

export default addDeliveryAddress;


// form tu sua,, refferance tu DeliveyAddressModal 
