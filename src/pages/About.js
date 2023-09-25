function About() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Info</p>
        <h3>Tech Stack:</h3>
        <p>React | Firebase/Firestore | Google OAuth | Geocoding API</p>
        <p>Leaflet | Swiper | Figma | Pica | Vercel</p>
        <h3>Version:</h3>
        <p>1.0.0</p>
        <h3>Future Improvements:</h3>
        <ul>
          <li>
            Add search capabilities based on region
          </li>
          <li>
            Implement in-app messaging
          </li>
          <li>
            Add calender to show booking availibility
          </li>
          <li>
            Add distinctions of housing type (condo/apartment/house, etc.)
          </li>
          <li>
            Add list of amenities
          </li>
          <li>
            Add nearby attractions
          </li>
        </ul>
      </header>
    </div>
  )
}
export default About