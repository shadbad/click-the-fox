import { configureStore, combineReducers, createListenerMiddleware } from '@reduxjs/toolkit';

import ui from './slices/ui.slice';
import players, { listeners as playersListeners } from './slices/players.slice';

const rootReducer = combineReducers({ ui, players });

const listenerMiddleware = createListenerMiddleware();

const store = configureStore({

    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => [listenerMiddleware.middleware, ...getDefaultMiddleware()]

});

listenerMiddleware.startListening(playersListeners.ModifyListener);

export type RootStateType = ReturnType<typeof rootReducer>;

export { store };
