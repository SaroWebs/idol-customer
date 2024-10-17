import React from 'react'
import Footer from '../Components/Navigation/Footer';
import Header from '../Components/Navigation/Header';
import { useAuth } from '../contexts/AuthContext';
import SideBar from '../Components/Navigation/SideBar';
import { useDisclosure } from '@mantine/hooks';

const MasterLayout = (props) => {
    const { isAuthenticated, user, setIsAuthenticated } = useAuth();
    const [opened, { open, close }] = useDisclosure(false);

    const { children } = props;
    return (
        <div className='relative'>
            <Header isAuthenticated={isAuthenticated} openSidebar={open} />
            <SideBar
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                isOpen={opened}
                closeSidebar={close}
            />
            <div className="" style={{ marginTop: '4rem', marginBottom: '4rem', minHeight: '80vh', background: '#bebebe' }}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MasterLayout