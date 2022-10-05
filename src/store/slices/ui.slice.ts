import { createSlice } from '@reduxjs/toolkit';

interface IPrimitiveActionType<T> {
    type: string,
    payload: T
};

interface IUIStateType {
    isMenuDrawerOpen: boolean,
    userName: string
}

const initialState: IUIStateType = {
    isMenuDrawerOpen: false,
    userName: ''
}

const uiSlice = createSlice({

    name: 'ui',

    initialState,

    reducers: {

        setMenuDrawerStatus: (state, action: IPrimitiveActionType<boolean>) => {

            state.isMenuDrawerOpen = action.payload;

        },

        setUserName: (state, action: IPrimitiveActionType<string>) => {

            state.userName = action.payload;

        }

    }

});

export const actions = { ...uiSlice.actions };

export default uiSlice.reducer;
