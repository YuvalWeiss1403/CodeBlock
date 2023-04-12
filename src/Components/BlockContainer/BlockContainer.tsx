import { useSelector } from "react-redux";
import "./BlockContainer.css";
import { RootState } from "../../store/store";
import SubjectCard from "./SubjectCard/SubjectCard";
import { IBlock } from "../../store/slices/BlocksSlice";

const BlockContainer: React.FC = () => {
	const data = useSelector((state: RootState) => state.BlocksData?.value);
	console.log(data);

	return (
		<div className="CodeBlocks">
			{data.map((codeBlocks: IBlock, index: number) => {
				return (
					<div className="single-subject">
						<SubjectCard
							name={codeBlocks.title}
							_id={codeBlocks._id}
							key={index}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default BlockContainer;
