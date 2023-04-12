import { configureStore } from "@reduxjs/toolkit";
// import { ICodeBlock } from "./slices/CodeBlockSlice";
// import codeBlocksReducer from "./slices/CodeBlockSlice";
import BlocksReducer, { IBlock } from "./slices/BlocksSlice";
export interface RootState {
	BlocksData: IBlockState;
}

export interface IBlockState {
	value: IBlock[];
}

export default configureStore({
	reducer: {
		BlocksData: BlocksReducer,
	},
});
