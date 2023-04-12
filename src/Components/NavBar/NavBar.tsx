import "../NavBar/NavBar.css";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="navbar">
				<button className="home-page-button" onClick={() => navigate("/")}>
					Lobby
				</button>
			</div>
		</>
	);
};

export default Navbar;
