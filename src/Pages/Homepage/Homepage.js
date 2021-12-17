import React from "react";
import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/NavBar/NavBar";
import Banner from "./Components/Banner/Banner";
import Banner2 from "./Components/Banner2/Banner2";
import Gigs from "./Components/Gigs/Gigs";

const Homepage = () => {
	return (
		<div>
			<NavBar />
			{/* <Categories /> */}
			<Banner />
			<Gigs />
			<Banner2 />
			<Footer />
		</div>
	);
};

export default Homepage;
