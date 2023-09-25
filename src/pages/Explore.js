import { useState } from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../components/Slider";


function Explore() {

  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Hunt for Your Hive</p>
      </header>
      <main className="">
        <Slider />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Hives for Rent</p>
          </Link>
          <Link to="/category/sale">
            <img src={sellCategoryImage} alt="sell" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Hives for Sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
export default Explore