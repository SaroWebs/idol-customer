import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { 
    Container, 
    Card, 
    Title, 
    TextInput, 
    Button, 
    FileInput, 
    Group 
} from '@mantine/core';
import MasterLayout from "../../Layouts/MasterLayout";

const MyProfile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        image: {
            file: null,
            image_url: '',
        },
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || '',
                image: {
                    image_url: user.image_url || '',
                    file: null,
                },
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? { ...prev.image, file: files[0] } : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //updateUser(formData); // Call your update function
        console.log(formData);
        
    };

    return (
        <MasterLayout title="Edit Profile">
            <Container>
                <Card padding="lg">
                    <form onSubmit={handleSubmit}>
                        <Title order={3} align="center">Edit Profile</Title>
                        <div className="text-center mb-3">
                            <div className="mb-3">
                                {formData.image.file ? (
                                    <img
                                        src={URL.createObjectURL(formData.image.file)}
                                        alt="User Profile"
                                        className="rounded-circle border border-success"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                ) : (
                                    <img
                                        src={formData.image.image_url || "/assets/images/no-image.png"}
                                        alt="Default Profile"
                                        className="rounded-circle border border-success"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                )}
                            </div>
                            <FileInput
                                name="image"
                                accept="image/*"
                                onChange={(file) => setFormData((prev) => ({
                                    ...prev,
                                    image: { ...prev.image, file }
                                }))}
                                label="Upload Profile Picture"
                                className="form-control"
                            />
                        </div>

                        <TextInput
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="mb-3"
                        />
                        <TextInput
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                            className="mb-3"
                        />
                        <TextInput
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="mb-3"
                        />

                        <Group position="center" mt="md">
                            <Button type="submit" color="blue">
                                Save Changes
                            </Button>
                        </Group>
                    </form>
                </Card>
            </Container>
        </MasterLayout>
    );
};

export default MyProfile;