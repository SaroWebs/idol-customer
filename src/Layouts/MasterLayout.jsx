import React from 'react'
import Footer from '../Components/Navigation/Footer';
import Header from '../Components/Navigation/Header';
import { useAuth } from '../contexts/AuthContext';
import SideBar from '../Components/Navigation/SideBar';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';
import PopupScreen from '../Components/Navigation/PopupScreen';

const MasterLayout = (props) => {
    const { isAuthenticated, user, loading, logout } = useAuth();
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const { title, children } = props;
    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className="position-relative">
            {loading && loading.active && (
                <div
                    className="position-fixed top-0 start-0 d-flex justify-content-center align-items-center"
                    style={{
                        zIndex: 9999,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Loader color="blue" size="lg" />
                </div>
            )}

            <Header isAuthenticated={isAuthenticated} openSidebar={open} />
            <SideBar
                isAuthenticated={isAuthenticated}
                logout={logout}
                user={user}
                isOpen={opened}
                closeSidebar={close}
            />
            <div className="bg-white" style={{ marginTop: '1rem', paddingTop:'1rem', marginBottom: '3.5rem', minHeight: '90vh', background: '#bebebe' }}>

                {(title && title !== 'home') ? (
                    <div className="page-header">
                        <div className="d-flex p-2 align-items-start" style={{ gap: '1rem' }}>
                            <div className="back-button">
                                <button onClick={handleBack} style={{ border: 'none', background: 'transparent' }}>
                                    <i style={{ fontSize: 'xx-large', color: '#00b894' }}
                                        className="fa fa-arrow-circle-left" aria-hidden="true"
                                    ></i>
                                </button>
                            </div>

                            <div className="">
                                <div className="title text-capitalize fw-bold">
                                    <h3>{title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {children}

            </div>
            <Footer />
            <PopupScreen/>
        </div>
    )
}

export default MasterLayout