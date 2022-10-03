import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import Board from 'models/board';
import boardServices from 'services/boardServices';


interface IBoardStateType {
    isLoading: boolean,
    error: string,
    boards: Board[]
}

const fetch = createAsyncThunk('board/fetch', async (arg, thunkAPI) => {

    const boards: Board[] = [];

    boards.push((await boardServices.generator.next()).value as Board);

    return boards;

});

const initialState: IBoardStateType = {
    isLoading: false,
    error: '',
    boards: []
}

const boardSlice = createSlice({

    name: 'board',

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(fetch.pending, (state, action) => {

            state.isLoading = true;
            state.error = '';
            state.boards = [];

        });

        builder.addCase(fetch.fulfilled, (state, action) => {

            state.isLoading = false;
            state.error = '';
            state.boards = action.payload;

        });

        builder.addCase(fetch.rejected, (state, action) => {

            state.isLoading = false;
            state.error = action.error?.message ?? 'Error';
            state.boards = [];

        });

    }

});

export const actions = { ...boardSlice.actions, fetch };

export default boardSlice.reducer;
