import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Account = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <MasterLayout title="Account">
      <div className="login-wrapper bg-white d-flex align-items-center justify-content-center text-center">
        <div className="container">
          <div className="settings-wrapper py-3 px-2">

            {/* Single Setting Cards */}
            <SettingCard title="My Profile" icon="lni lni-user" link="/profile" />
            <SettingCard title="Delivery Address" icon="lni lni-map-marker" link="/delivery-address" />
            <SettingCard title="addDelivery Address" icon="lni lni-map-marker" link="/add-delivery-address" />
            <SettingCard title="My Prescriptions" icon="lni lni-files" link="/prescriptions" />
            <SettingCard title="Privacy Policy" icon="lni lni-protection" link="/privacy-policy" />
            <SettingCard title="Terms & Conditions" icon="fa fa-question-circle-o" link="/terms" />
            <div className="card settings-card">
              <div className="card-body">
              <a href="javascript:void(0);" onClick={handleLogout}>
                <div className="single-settings d-flex align-items-center justify-content-between">
                  <div className="title"><i className='lni lni-power-switch'></i><span>Logout</span></div>
                  <div className="data-content">
                    <i className="lni lni-chevron-right"></i>
                  </div>
                </div>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Account;

const SettingCard = ({ title, icon, link }) => {
  return (
    <div className="card settings-card">
      <div className="card-body">
        <Link to={link}>
          <div className="single-settings d-flex align-items-center justify-content-between">
            <div className="title"><i className={icon}></i><span>{title}</span></div>
            <div className="data-content">
              <i className="lni lni-chevron-right"></i>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};