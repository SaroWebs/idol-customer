import React from "react";
import { Container, Card, Title, Button } from '@mantine/core';
import { Link } from "react-router-dom"; // Import Link for navigation
import MasterLayout from "../../Layouts/MasterLayout";

const DeliveryAddress = () => {
    return (
        <MasterLayout title="Your Addresses">
            <Container>
                <Card padding="lg">
                    <Title order={3} align="center">Your Addresses</Title>
                    <div className="flex justify-between mt-4">
                        <div className="back-button">
                            <Link to="/previous-page"> {/* Change to your desired route */}
                                <Button variant="subtle" color="green" leftIcon={<i className="fa fa-arrow-circle-left"></i>}>
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="settings-wrapper py-3">
                        <span id="status"></span>

                        <Link
                            to="/add-delivery-address" // Adjust to your route
                            className="btn btn-info btn-sm w-full mb-2 bg-blue-500 text-white py-2 rounded text-center"
                        >
                            ADD NEW ADDRESS
                        </Link>

                        <form method="post">
                            <button
                                type="submit"
                                id="submit"
                                className="hidden btn btn-success btn-sm w-full mb-2 bg-green-500 text-white py-2 rounded delivery"
                            >
                                SELECT DELIVERY PREFERENCE
                            </button>
                        </form>
                    </div>
                </Card>
            </Container>
        </MasterLayout>
    );
};

export default DeliveryAddress;
