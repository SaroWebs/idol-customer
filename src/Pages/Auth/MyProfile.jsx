import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { useAuth } from '../../contexts/AuthContext';
import { STORAGE_PATH } from '../../config/config';

const MyProfile = () => {
  const { user } = useAuth();
  console.log(user);

  // Check if user is defined before accessing addresses
  const userAddress = user && user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;

  return (
    <MasterLayout title="Your Profile">
      <div className="card user-data-card">
        <div className="flex justify-center my-3">
          <div className="max-w-[50px] w-full rounded-full border border-green-600 overflow-hidden">
            {user && user.image_url ? (
              <img
                src={`${STORAGE_PATH}/${user.image_url}`}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/assets/images/no-image.png"
                alt="Default Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="card-body">
          <ProfileData title="Full Name" icon="lni lni-user" content={user ? user.name : 'N/A'} />
          <ProfileData title="Phone" icon="lni lni-phone" content={user ? user.phone : 'N/A'} />
          <ProfileData title="Email Address" icon="lni lni-envelope" content={user ? user.email : 'N/A'} />
          {userAddress ? (
            <ProfileData
              title="Shipping"
              icon="lni lni-map-marker"
              content={`${userAddress.address_line_1}, ${userAddress.city}, ${userAddress.state}, ${userAddress.pin}`}
            />
          ) : null}
          <div className="single-profile-data d-flex align-items-center justify-content-between">
            <div className="title d-flex align-items-center">
              <i className="lni lni-star"></i>
              <span>My Order</span>
            </div>
            <div className="data-content">
              <a className="btn btn-danger btn-sm" href="/orders">View</a>
            </div>
          </div>
          <div className="edit-profile-btn mt-3">
            <a className="btn btn-info w-100" href="/edit-profile">
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
    <div className="title d-flex align-items-center">
      <i className={icon}></i>
      <span>{title}</span>
    </div>
    <div className="data-content">{content}</div>
  </div>
);

export default MyProfile;
