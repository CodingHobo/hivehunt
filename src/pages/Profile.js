import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"


function Profile() {
  const auth = getAuth();

  const [ editUserDetails, setEditUserDetails ] = useState(false);

  const [ formData, setFormData ] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const { name, email } = formData;

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      auth.currentUser.displayName !== name && (
        // Update display name in Firebase
        await updateProfile(auth.currentUser, {
          displayName: name
      }));

      auth.currentUser.email !== email && (
        await updateEmail(auth.currentUser, email));

      // Update details in Firestore
      const useRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(useRef, {
        name,
        email
      });
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>{name}'s Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Profile Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              editUserDetails && onSubmit();
              setEditUserDetails((prevState) => !prevState);
            }}
          >
            {editUserDetails ? 'Done' : 'Edit'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={
                !editUserDetails
                  ?
                  'profileName'
                  :
                  'profileNameActive'
              }
              disabled={!editUserDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              className={
                !editUserDetails
                  ?
                  'profileEmail'
                  :
                  'profileEmailActive'
              }
              disabled={!editUserDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to="/create-listing" className="createListing" >
          <img src={homeIcon} alt="home" />
          <p>List Your Home For Sale or Rent</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  );
}

export default Profile;