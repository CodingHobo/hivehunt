import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase.config';
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg"
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [ editUserDetails, setEditUserDetails ] = useState(false);

  const [ formData, setFormData ] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const { name, email } = formData;

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings');

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);

      let listings = [];

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [ auth.currentUser.uid ]);

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

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  if (loading) {
    return <Spinner />
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

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
          <p>List Your Hive For Sale or Rent</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
        {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <li className="listingListItem">
                  <div className="listingListItemDiv">
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                      onDelete={() => onDelete(listing.id)}
                      onEdit={() => onEdit(listing.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;