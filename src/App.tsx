import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import SingleCodeBlockPage from "./Components/SingleCodeBlockPage/SingleCodeBlockPage";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/:subjectId" element={<SingleCodeBlockPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
