/* eslint-disable react/prop-types */
import './style.css';

const ProfileImage = ({ image, size = '130px' }) => {
  return (
    <div className="profile-image-container">
      {image ? (
        <img
          src={image}
          alt="Profile"
          className="profile-image"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          /*CHANGE THIS WITH DEFAULT PRPOFILE PIC*/
          className="profile-image-placeholder"
          style={{ width: size, height: size }}
        >
          No Image
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
