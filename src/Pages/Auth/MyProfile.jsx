import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { useAuth } from '../../contexts/AuthContext';

const MyProfile = () => {
  const { user } = useAuth();

  console.log(user);

  // Assuming the user's address is the first one, you can modify this logic as needed
  const userAddress = user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;

  return (
    <MasterLayout title="Your Profile">
      <div className="card user-data-card">
        <div className="card-body">
          <ProfileData title="Full Name" icon="lni lni-user" content={user.name} />
          <ProfileData title="Phone" icon="lni lni-phone" content={user.phone} />
          <ProfileData title="Email Address" icon="lni lni-envelope" content={user.email} />
          <ProfileData
            title="Shipping"
            icon="lni lni-map-marker"
            content={userAddress ? `${userAddress.address_line_1}, ${userAddress.city}, ${userAddress.state}, ${userAddress.pin}` : 'N/A'}
          />
          <div className="single-profile-data d-flex align-items-center justify-content-between">
            <div className="title d-flex align-items-center">
              <i className="lni lni-star"></i>
              <span>My Order</span>
            </div>
            <div className="data-content">
              <a className="btn btn-danger btn-sm" href="#my-orders">View</a>
            </div>
          </div>
          <div className="edit-profile-btn mt-3">
            <a className="btn btn-info w-100" href="#edit-profile">
              <i className="lni lni-pencil me-2"></i>Edit Profile
            </a>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

const ProfileData = ({ title, icon, content }) => (
  <div className="single-profile-data d-flex align-items-center justify-content-between">
    <div className="title d-flex align-items-center"><i className={icon}></i><span>{title}</span></div>
    <div className="data-content">{content}</div>
  </div>
);

export default MyProfile;
