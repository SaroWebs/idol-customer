import React from 'react'
import Footer from '../Components/Navigation/Footer';
import Header from '../Components/Navigation/Header';
import { useAuth } from '../contexts/AuthContext';
import SideBar from '../Components/Navigation/SideBar';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

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
            {loading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-40" style={{zIndex:9999999999}}>
                    <span style={{ color: 'white' }}>loading...</span>
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
            <div className="" style={{ marginTop: '4rem', marginBottom: '4rem', minHeight: '90vh', background: '#bebebe' }}>

                {(title && title !== 'home') ? (
                    <div className="page-header">
                        <div className="d-flex p-2 align-items-center" style={{ gap: '1rem' }}>
                            <div className="back-button">
                                <button onClick={handleBack} style={{ border: 'none', background: 'transparent' }}>
                                    <i
                                        style={{ fontSize: 'xx-large', color: '#00b894' }}
                                        className="fa fa-arrow-circle-left" aria-hidden="true"
                                    ></i>
                                </button>
                            </div>

                            <div className="">
                                <div className="title text-capitalize fw-bold">
                                    <h2>{title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {children}

            </div>
            <Footer />
        </div>
    )
}

export default MasterLayout