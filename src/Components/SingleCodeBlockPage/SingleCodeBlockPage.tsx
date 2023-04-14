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
import { useRef, useState } from "react"; // Import useRef instead of useEffect
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IBlock } from "../../store/slices/BlocksSlice";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const SingleCodeBlockPage: React.FC = () => {
	let { subjectId } = useParams<string>();
	const [loggedIn, setLoggedIn] = useState(false);
	const data = useSelector((state: RootState) => state.BlocksData?.value);
	const currentData = data?.filter((sub: IBlock) => {
		return sub?._id?.toString() === subjectId;
	});
	const MySubject = currentData[0];
	const [TextCode, setTextCode] = useState(MySubject.code);

	const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
		null
	); // Create a ref for socket

	const CONNECTION_PORT = "localhost:3001/";

	const sendMessage = () => {
		setLoggedIn(true);
		socketRef.current?.emit("join_room", MySubject); // Access the socket via the ref
	};

	// Replace useEffect with useRef
	useRef(() => {
		socketRef.current = io(CONNECTION_PORT); // Assign the socket instance to the ref
		return () => {
			socketRef.current?.disconnect(); // Cleanup function to disconnect the socket on unmount
		};
	});

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
			<button onClick={() => sendMessage()}>submit</button>
		</div>
	);
};

export default SingleCodeBlockPage;
