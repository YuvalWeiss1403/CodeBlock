import "./SingleCodeBlockPage.css";
import Navbar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";

const SingleCodeBlockPage: React.FC = () => {
	let { subjectId } = useParams<string>();

	return (
		<div className="code-block-page">
			<Navbar />
			<div>{subjectId}</div>
		</div>
	);
};

export default SingleCodeBlockPage;
