export { store } from './store';
export type { RootStateType } from './store';
export { storeInitializer } from './initialize';

// #region actions

export { actions as uiActions } from './slices/ui.slice';
export { actions as playersActions } from './slices/players.slice';

// #endregion