import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const [ listings, setListings ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ lastFetchedListing, setLastFetchedListing ] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Craeate query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
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
  }, [ params.categoryName ]);

  // Pagination =>> Load more
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Craeate query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
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

  if (loading) {
    return <Spinner />
  }


  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Hives for Rent"
            : "Hives for Sale"
          }
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className="categoryListings">
                {listings.map((listing) => (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </ul>
            </main>
            <br />
            <br />
            {lastFetchedListing && (
              <p className="loadMore" onClick={onFetchMoreListings}>More listings</p>
            )}
          </>
      ) : ( <p>No listings for {params.categoryName}</p>
      )}
      {params.categoryName === "rent"
        ? <Link to="/category/sale">
        <p className="exploreCategoryName">Check out Hives for Sale</p>
        </Link>
        : <Link to="/category/rent">
        <p className="exploreCategoryName">Check out Hives for Rent</p>
        </Link>
      }

    </div>
  )
}
export default Category