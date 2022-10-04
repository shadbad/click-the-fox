import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type ScoreBoardRecordType = {

    user: string,
    score: number,
    date: number

};

interface IPlayersStateType {
    isLoading: boolean,
    error: string,
    user: string,
    scoreboard: ScoreBoardRecordType[]
};

interface IPrimitiveActionType<T> {
    type: string,
    payload: T
};

const initialState: IPlayersStateType = {
    isLoading: false,
    error: '',
    user: '',
    scoreboard: []
};

const loadFromLocalStorage = createAsyncThunk('players/loadFromLocalStorage', (arg, thunkAPI) => {

    const localStorageData = window.localStorage.getItem('scoreboard');

    return localStorageData ? JSON.parse(localStorageData) : [];

});

const playersSlice = createSlice({

    name: 'players',

    initialState,

    reducers: {

        setUser: (state, action: IPrimitiveActionType<string>) => {
            state.user = action.payload;
        },

        addScore: (state, action: IPrimitiveActionType<number>) => {

            const scoreboardItem = {
                user: state.user,
                score: action.payload,
                date: new Date().valueOf()
            };

            state.scoreboard = [...state.scoreboard, scoreboardItem]
                .sort((a: ScoreBoardRecordType, b: ScoreBoardRecordType) => b.score - a.score);

        }
    },

    extraReducers: (builder) => {

        builder.addCase(loadFromLocalStorage.pending, (state, action) => {

            state.isLoading = true;
            state.error = '';
            state.user = '';
            state.scoreboard = [];

        });

        builder.addCase(loadFromLocalStorage.fulfilled, (state, action) => {

            state.isLoading = false;
            state.error = '';
            state.scoreboard = action.payload;

        });

        builder.addCase(loadFromLocalStorage.rejected, (state, action) => {

            state.isLoading = false;
            state.error = action.error?.message ?? 'Error';
            state.user = '';
            state.scoreboard = [];

        });

    }

});

const ModifyListener = {

    type: 'players/addScore',

    effect: (action: any, listenerApi: { getState: any; }) => {

        const { getState } = listenerApi;
        const { players } = getState();

        window.localStorage.setItem('scoreboard', JSON.stringify(players.scoreboard));

    }
};

export const listeners = { ModifyListener };

export const actions = { ...playersSlice.actions, loadFromLocalStorage };

export default playersSlice.reducer;
