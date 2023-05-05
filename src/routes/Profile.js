import { signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const handleLogoutClick = () => {
    signOut(auth);
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => {
    setNewDisplayName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="profileForm">
        <input
          onChange={handleChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={handleLogoutClick}>
        Log Out
      </span>      
    </div>
  );
};

export default Profile;
