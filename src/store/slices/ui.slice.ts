import { createSlice } from '@reduxjs/toolkit';

interface IPrimitiveActionType<T> {
    type: string,
    payload: T
};

interface IUIStateType {
    isMenuDrawerOpen: boolean,
    isIntroAnimationDone: boolean,
    userName: string
}

const initialState: IUIStateType = {
    isMenuDrawerOpen: false,
    isIntroAnimationDone: false,
    userName: ''
}

const uiSlice = createSlice({

    name: 'ui',

    initialState,

    reducers: {

        setMenuDrawerStatus: (state, action: IPrimitiveActionType<boolean>) => {

            state.isMenuDrawerOpen = action.payload;

        },

        setIntroAnimationStatus: (state, action: IPrimitiveActionType<boolean>) => {

            state.isIntroAnimationDone = action.payload;

        },

        setUserName: (state, action: IPrimitiveActionType<string>) => {

            state.userName = action.payload;

        }

    }

});

export const actions = { ...uiSlice.actions };

export default uiSlice.reducer;
