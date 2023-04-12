import BlockContainer from "../BlockContainer/BlockContainer";
import "./Hero.css";

const Hero: React.FC = () => {
	return (
		<>
			<div className="hero">
				<div className="hero-title">Choose your code block</div>
				<BlockContainer />
			</div>
		</>
	);
};

export default Hero;
