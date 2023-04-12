import Hero from "../Hero/Hero";
import "../HomePage/HomePage.css";
import Navbar from "../NavBar/NavBar";

const HomePage: React.FC = () => {
	return (
		<div className="home-page">
			<Navbar />
			<Hero />
		</div>
	);
};

export default HomePage;
