import { TEST_EMAIL } from "../config/config";
import { useAuth } from "../contexts/AuthContext";

export const menuLinks = [
    { path: '/', label: 'Home', icon: 'lni lni-home', protected: false },
    { path: '/orders', label: 'Orders', icon: 'lni lni-delivery', protected: true },
    { path: '/cart', label: 'Cart', icon: 'lni lni-cart', protected: true },
    { path: '/prescriptions', label: 'Prescriptions', icon: 'lni lni-upload', protected: true },
    { path: '/account', label: 'Account', icon: 'lni lni-user', protected: true },
];

export const getMenuLinks = (isAuthenticated) => {
    let filteredLinks = [...menuLinks];

    if (isAuthenticated) {
        const { user } = useAuth();
        if (user?.email === TEST_EMAIL) {
            filteredLinks = filteredLinks.filter(link => link.path !== '/prescriptions');
        }
    }else{
        filteredLinks = filteredLinks.filter(link => link.path !== '/prescriptions');  
    }

    return filteredLinks.map(link => ({
        ...link,
        path: link.protected && !isAuthenticated ? '/login' : link.path
    }));
};
