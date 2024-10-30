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
      <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="container">
          <div className="settings-wrapper py-3">

            {/* Single Setting Cards */}
            <SettingCard title="My Profile" icon="lni lni-use" link="/profile" />
            <SettingCard title="Delivery Address" icon="lni lni-location-pin" link="/delivery-address" />
            <SettingCard title="My Prescriptions" icon="lni lni-location-pin" link="/prescriptions" />
            <SettingCard title="Privacy Policy" icon="lni lni-protection" link="/privacy-policy" />
            <SettingCard title="Terms & Conditions" icon="fa fa-question-circle-o" link="/terms" />
            <div className="card settings-card">
              <div className="card-body">
                <div className="single-settings d-flex align-items-center justify-content-between">
                  <div className="title"><i className='lni lni-power-switch'></i><span>Logout</span></div>
                  <div className="data-content">
                    <a href="javascript:void(0);" onClick={handleLogout}><i className="lni lni-chevron-right"></i></a>
                  </div>
                </div>
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
        <div className="single-settings d-flex align-items-center justify-content-between">
          <div className="title"><i className={icon}></i><span>{title}</span></div>
          <div className="data-content">
            <Link to={link}>Read<i className="lni lni-chevron-right"></i></Link>
          </div>
        </div>
      </div>
    </div>
  );
};