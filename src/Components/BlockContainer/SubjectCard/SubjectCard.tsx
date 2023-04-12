import { useNavigate } from "react-router";
import "./SubjectCard.css";
import { ObjectId } from "mongoose";

export interface ISubjectCard {
	name: string;
	_id?: ObjectId;
}

const SubjectCard: React.FC<ISubjectCard> = (props: ISubjectCard) => {
	const navigator = useNavigate();

	const handelCardClick = (codeBlockId: string) => {
		navigator(`/${codeBlockId}`);
	};

	return (
		<div
			className="subject-card"
			onClick={() => handelCardClick(String(props._id))}>
			<span>{props.name}</span>
		</div>
	);
};

export default SubjectCard;
