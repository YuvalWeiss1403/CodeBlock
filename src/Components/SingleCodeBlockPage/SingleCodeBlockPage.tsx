import "./SingleCodeBlockPage.css";
import Navbar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react"; // Import useRef instead of useEffect
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IBlock } from "../../store/slices/BlocksSlice";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import CodeMirror from "@uiw/react-codemirror";
import { javascript, typescriptLanguage } from "@codemirror/lang-javascript";
import axios from "axios";

const SingleCodeBlockPage: React.FC = () => {
	let { subjectId } = useParams<string>();
	const data = useSelector((state: RootState) => state.BlocksData?.value);
	const currentData = data?.filter((sub: IBlock) => {
		return sub?._id?.toString() === subjectId;
	});
	const MySubject = currentData[0];
	const [CurrentCodeBlock, setCurrentCodeBlock] = useState<IBlock>(MySubject);
	const [TextCode, setTextCode] = useState<string>(MySubject.code);
	const [SaveChanges, setSaveChanges] = useState<boolean>(false);
	const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
		null
	);
	const CONNECTION_PORT = "localhost:3001/";

	const UpdateCodeBlock = async (_id: string, newCode: string) => {
		try {
			const response = await axios.put(
				"http://localhost:3001/codeblock/",
				{ _id: _id, newCode: newCode },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} catch (error: any) {
			alert(error.response.data);
		}
	};

	const UpdateServer = (e: React.MouseEvent<HTMLElement>) => {
		if (subjectId) {
			UpdateCodeBlock(subjectId, TextCode);
		}
		setSaveChanges(true);
		setTimeout(() => {
			setSaveChanges(false);
		}, 1500);
	};

	const handelTextChange = (e: string) => {
		setCurrentCodeBlock((CurrentCodeBlock) => ({
			...CurrentCodeBlock,
			code: e,
		}));
		socketRef.current?.emit("codeBlock", subjectId, TextCode);
	};

	useRef(() => {
		socketRef.current = io(CONNECTION_PORT);
		return () => {
			socketRef.current?.disconnect();
		};
	});

	useEffect(() => {
		socketRef.current = io(CONNECTION_PORT);
	}, [CONNECTION_PORT]);

	useEffect(() => {
		socketRef.current?.emit("join_room", CurrentCodeBlock);
		socketRef.current?.on("codeBlock", (CurrentCode) => {
			setTextCode(CurrentCode);
		});
	}, [socketRef]);

	useEffect(() => {
		socketRef.current?.emit("codeBlock", subjectId, TextCode);
		handelTextChange(TextCode);
	}, [TextCode]);

	return (
		<div className="code-block-page">
			<Navbar />
			<div className="subject-title">{MySubject.title}</div>
			<div className="note-permissions">
				{CurrentCodeBlock.isMentor ? "Readonly" : "Read ,Write"}
			</div>
			{CurrentCodeBlock.usersConnected != 1 && (
				<CodeMirror
					className="code-area"
					value={TextCode}
					onChange={async (e) => {
						await setTextCode(e);
					}}
					theme="dark"
					extensions={[javascript({ jsx: true })]}></CodeMirror>
			)}
			{CurrentCodeBlock.usersConnected === 1 && (
				<CodeMirror
					className="code-area"
					value={TextCode}
					onChange={async (e) => {
						await setTextCode(e);
					}}
					theme="dark"
					extensions={[javascript({ jsx: true })]}></CodeMirror>
			)}
			<button onClick={(e) => UpdateServer(e)}>
				{SaveChanges ? "Saved!" : "Save Changes"}
			</button>
		</div>
	);
};

export default SingleCodeBlockPage;
