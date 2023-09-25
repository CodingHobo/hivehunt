import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        <Header />
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
            <Route path="/category/:categoryName/:listingId" element={<Listing />} />
            <Route
              path="/profile"
              element={<PrivateRoute> <Profile /> </PrivateRoute>}
            />
            <Route path="/contact/:ownerId" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
