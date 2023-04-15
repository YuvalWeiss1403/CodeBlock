// import "./SingleCodeBlockPage.css";
// import Navbar from "../NavBar/NavBar";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Socket, io } from "socket.io-client";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { IBlock } from "../../store/slices/BlocksSlice";
// import { DefaultEventsMap } from "@socket.io/component-emitter";
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";

// const SingleCodeBlockPage: React.FC = () => {
// 	let { subjectId } = useParams<string>();
// 	const [loggedIn, setLoggedIn] = useState(false);

// 	const data = useSelector((state: RootState) => state.BlocksData?.value);
// 	const currentData = data?.filter((sub: IBlock) => {
// 		return sub?._id?.toString() === subjectId;
// 	});
// 	const MySubject = currentData[0];
// 	const [TextCode, setTextCode] = useState(MySubject.code);

// 	let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
// 	const CONNECTION_PORT = "localhost:3001/";

// 	useEffect(() => {
// 		socket = io(CONNECTION_PORT);
// 	}, [CONNECTION_PORT]);

// 	const sendMessage = () => {
// 		setLoggedIn(true);
// 		socket.emit("join_room", MySubject);
// 	};

// 	return (
// 		<div className="code-block-page">
// 			<Navbar />
// 			<div className="subject-title">{MySubject.title}</div>
// 			<CodeMirror
// 				className="code-area"
// 				value={TextCode}
// 				onChange={(e) => setTextCode(e)}
// 				theme="dark"
// 				extensions={[javascript({ jsx: true })]}></CodeMirror>
// 			<button onClick={() => sendMessage()}>submit</button>
// 		</div>
// 	);
// };

// export default SingleCodeBlockPage;

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
import { javascript } from "@codemirror/lang-javascript";
import { ObjectId } from "mongoose";
import axios from "axios";

const SingleCodeBlockPage: React.FC = () => {
	let { subjectId } = useParams<string>();
	const data = useSelector((state: RootState) => state.BlocksData?.value);
	const currentData = data?.filter((sub: IBlock) => {
		return sub?._id?.toString() === subjectId;
	});
	const MySubject = currentData[0];
	const [TextCode, setTextCode] = useState(MySubject.code);
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

	const sendMessage = (e: React.MouseEvent<HTMLElement>) => {
		socketRef.current?.emit("send_message", MySubject);
		if (subjectId) {
			UpdateCodeBlock(subjectId, TextCode);
		}
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
		socketRef.current?.emit("join_room", MySubject); // Access the socket via the ref
	}, []);

	useEffect(() => {
		socketRef.current?.emit("join_room", MySubject); // Access the socket via the ref
		socketRef.current?.on("send_message", (MySubject) => {
			setTextCode(MySubject.code);
		});

		return () => {
			socketRef.current?.off("send_message");
		};
	}, [socketRef]);

	return (
		<div className="code-block-page">
			<Navbar />
			<div className="subject-title">{MySubject.title}</div>
			<CodeMirror
				className="code-area"
				value={TextCode}
				onChange={(e) => setTextCode(e)}
				theme="dark"
				extensions={[javascript({ jsx: true })]}></CodeMirror>
			<button onClick={(e) => sendMessage(e)}>submit</button>
		</div>
	);
};

export default SingleCodeBlockPage;
