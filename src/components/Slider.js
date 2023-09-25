import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'


function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
    const listingsRef = collection(db, 'listings')
    const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
    const querySnap = await getDocs(q)

    let listings = []

    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      })
    })

    setListings(listings)
    setLoading(false)
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    listings && (
      <>
        <p className='exploreHeading'>Buzzworthy Deals</p>

        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
      >
        {listings.map(({ data, id }) => {
          return (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  padding: '150px',
                  borderRadius: '1.5rem',
                }}
                className="swipeSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${formatNumberWithCommas(data.discountedPrice ?? data.regularPrice)}{' '}
                  {data.type === 'rent' && '/month'}
                </p>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      </>
    )
  )
}

export default Slider