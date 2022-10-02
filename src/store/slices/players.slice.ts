import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IPlayersStateType {
    isLoading: boolean,
    error: string,
    user: string,
    scoreboard: {
        user: string,
        score: number
    }[]
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

    const localStorageData = window.localStorage.getItem('players');

    if (localStorageData) {

        return JSON.parse(localStorageData);

    }

    return {};

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
                score: action.payload
            };

            const record = state.scoreboard.find((record) => record.user === scoreboardItem.user);

            if (record && record.score < scoreboardItem.score)
                state.scoreboard = [...state.scoreboard.filter((record) => record.user !== scoreboardItem.user), scoreboardItem];
            else
                state.scoreboard = [...state.scoreboard, scoreboardItem];

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
            state.user = action.payload.user;
            state.scoreboard = action.payload.scoreboard;

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

        window.localStorage.setItem('cart', JSON.stringify({ user: players.user, scoreboard: players.scoreboard }));

    }
};

export const listeners = { ModifyListener };

export const actions = { ...playersSlice.actions, loadFromLocalStorage };

export default playersSlice.reducer;
