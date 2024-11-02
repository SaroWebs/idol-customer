import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { Link } from 'react-router-dom';

const AccountSettings = () => {
  return (
    <MasterLayout title={'Settings'}>
      <div className="page-content-wrapper">
        <div className="container">
          {/* Settings Wrapper */}
          <div className="settings-wrapper py-3">

            {/* Night Mode Toggle */}
            <div className="card settings-card">
              <div className="card-body">
                <div className="single-settings d-flex align-items-center justify-content-between">
                  <div className="title"><i className="lni lni-night"></i><span>Night Mode</span></div>
                  <div className="data-content">
                    <div className="toggle-button-cover">
                      <div className="button r">
                        <input className="checkbox" id="darkSwitch" type="checkbox" />
                        <div className="knobs"></div>
                        <div className="layer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Setting Cards */}
            <SettingCard title="About Us" icon="lni lni-rocket" link="/about" />
            <SettingCard title="Support" icon="lni lni-question-circle" link="/support" />
            <SettingCard title="Privacy Policy" icon="lni lni-protection" link="/privacy-policy" />
            <SettingCard title="Terms & Conditions" icon="fa fa-question-circle-o" link="/terms-conditions" />
            {/* <SettingCard title="Disclaimer" icon="lni lni-bolt" link="/disclaimer" /> */}

          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default AccountSettings;

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
