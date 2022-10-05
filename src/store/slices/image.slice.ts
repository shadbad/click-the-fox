import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootStateType } from 'store/store';
import imageServices from 'services/imageServices';
import GameServices from 'services/gameServices';

interface IImageStateType {
    isLoading: boolean,
    error: string,
    cats: string[],
    dogs: string[],
    foxes: string[]
}

const fetch = createAsyncThunk('image/fetch', async (arg, thunkAPI) => {

    try {
        const state: RootStateType = thunkAPI.getState() as RootStateType;

        const sessionStorageData = window.sessionStorage.getItem('images');

        if (sessionStorageData) {

            thunkAPI.dispatch(imageSlice.actions.addImageCollection(JSON.parse(sessionStorageData)));

        } else {

            if (state.image.foxes.length === 0)
                for (let i = 0; i < GameServices.FOX_IMAGE_LOAD_SIZE; i++) {
                    try {
                        const url = await imageServices.fetch('fox');
                        imageServices.loadImage(url, () => thunkAPI.dispatch(imageSlice.actions.addImage({ animal: 'fox', url })));

                    } catch (error) {
                        i -= 1;
                    }
                }

            if (state.image.dogs.length === 0)
                for (let i = 0; i < GameServices.DOG_IMAGE_LOAD_SIZE; i++) {
                    try {
                        const url = await imageServices.fetch('dog');
                        imageServices.loadImage(url, () => thunkAPI.dispatch(imageSlice.actions.addImage({ animal: 'dog', url })));

                    } catch (error) {
                        i -= 1;
                    }
                }

            if (state.image.cats.length === 0)
                for (let i = 0; i < GameServices.CAT_IMAGE_LOAD_SIZE; i++) {
                    try {
                        const url = await imageServices.fetch('cat');
                        imageServices.loadImage(url, () => thunkAPI.dispatch(imageSlice.actions.addImage({ animal: 'cat', url })));

                    } catch (error) {
                        i -= 1;
                    }
                }
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

});

const initialState: IImageStateType = {
    isLoading: false,
    error: '',
    cats: [],
    dogs: [],
    foxes: []
}

const imageSlice = createSlice({

    name: 'image',

    initialState,

    reducers: {
        addImage: (state, { payload }: { type: string, payload: { animal: 'cat' | 'dog' | 'fox', url: string } }) => {

            switch (payload.animal) {
                case 'cat':
                    state.cats = [...state.cats, payload.url];
                    break;
                case 'dog':
                    state.dogs = [...state.dogs, payload.url];
                    break;
                default:
                    state.foxes = [...state.foxes, payload.url];
                    break;
            }

        },

        addImageCollection: (state, { payload }: { type: string, payload: { cats: string[], dogs: string[], foxes: string[] } }) => {
            state.cats = payload.cats;
            state.dogs = payload.dogs;
            state.foxes = payload.foxes;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetch.pending, (state, action) => {

            state.isLoading = true;
            state.error = '';
            state.cats = [];
            state.dogs = [];
            state.foxes = [];

        });

        builder.addCase(fetch.fulfilled, (state, action) => {

            state.isLoading = false;
            state.error = '';

            if (!window.sessionStorage.getItem('images'))
                window.sessionStorage.setItem('images', JSON.stringify({ cats: state.cats, dogs: state.dogs, foxes: state.foxes }));

        });

        builder.addCase(fetch.rejected, (state, action) => {

            state.isLoading = false;
            state.error = action.error?.message ?? 'Error';
            state.cats = [];
            state.dogs = [];
            state.foxes = [];

        });

    }

});

export const actions = { ...imageSlice.actions, fetch };

export default imageSlice.reducer;
