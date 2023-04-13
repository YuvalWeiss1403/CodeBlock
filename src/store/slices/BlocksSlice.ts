import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export interface IBlock {
	title: string;
	code: string;
	usersConnected: string;
	isMentor: boolean;
	_id?: ObjectId;
	codeBlocks?: any;
}

const CodeBlockData = async () => {
	try {
		const response = await fetch("http://localhost:3001/codeblock", {
			method: "GET",
		});
		const data = await response.json();
		return data;
	} catch (err) {}
};

const codeBlocks1: IBlock[] = await CodeBlockData();

console.log(codeBlocks1);

export const BlocksSlice = createSlice({
	name: "BlocksData",
	initialState: {
		value: codeBlocks1,
		filteredValue: {},
	},
	reducers: {
		SetAllCodeBlocks: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { SetAllCodeBlocks } = BlocksSlice.actions;

export default BlocksSlice.reducer;
