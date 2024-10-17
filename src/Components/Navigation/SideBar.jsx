import React from 'react'
import { Drawer } from '@mantine/core';
import { STORAGE_PATH } from '../../config/config';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = (props) => {
  const { isAuthenticated, setIsAuthenticated, user, isOpen, closeSidebar } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (
    <Drawer
      size={'xs'}
      opened={isOpen}
      onClose={closeSidebar}
      withCloseButton={false}
    >
      <div>
        {isAuthenticated && user && (
          <div className="sidenav-profile">
            <div className="user-profile">
              {user.image_url ?
                <img src={STORAGE_PATH + '/' + user.image_url} alt={user.name} />
                :
                <img src='#' alt='no-img' />
              }
            </div>
            <div className="user-info">
              <h6 className="user-name mb-0">{user.name}</h6>
            </div>
          </div>
        )}

        <ul className="sidenav-nav ps-0">
          {isAuthenticated ? (
            <>
              <li><Link to="/"><i className="lni lni-user"></i>My Profile</Link></li>
              <li><Link to="/"><i className="lni lni-cog"></i>Settings</Link></li>
              <li><a href="javascript:void(0);" onClick={handleLogout}><i className="lni lni-power-switch"></i>Log Out</a></li>
            </>
          ) :
            <li><Link to="/login"><i className='fa fa-sign-in'>Login</i></Link></li>
          }

          <hr />
          <h6 style={{ color: "#bbb" }}>Important Links</h6>
          <li><Link to="privacy-policy">Privacy Policy</Link></li>
          <li><Link to="refund-policy">Cancellation & Refund</Link></li>
          <li><Link to="terms-conditions">Terms & Conditions</Link></li>
        </ul>
        <div className="side-close-btn" onClick={closeSidebar}><i className="lni lni-arrow-left"></i></div>
      </div>
    </Drawer>
  )
}

export default SideBar