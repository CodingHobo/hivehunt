import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
  const [ listings, setListings ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ lastFetchedListing, setLastFetchedListing ] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Craeate query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(5)
        );

        // Execute query
        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[ querySnapshot.docs.length - 1 ];
        setLastFetchedListing(lastVisible);

        const listings = [];

        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings")
      }
    };
    fetchListings();
  }, []);

  // Pagination =>> Load more
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Craeate query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(5)
      );

      // Execute query
      const querySnapshot = await getDocs(q);

      const lastVisible = querySnapshot.docs[ querySnapshot.docs.length - 1 ];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setListings((preveState) => [...preveState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings")
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Special Offers
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className="listingsList">
                {listings.map((listing) => (
                  <li className="listingListItem">
                  <div className="listingListItemDiv">
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                    />
                    </div>
                </li>
                ))}
              </ul>
            </main>
            <br />
            <br />
            {lastFetchedListing && (
              <p className="loadMore" onClick={onFetchMoreListings}>More listings</p>
            )}
          </>
      ) : ( <p>No current offers</p>
      )}

    </div>
  )
}
export default Offers