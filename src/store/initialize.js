import { store, playersActions } from 'store';

const storeInitializer = function () {

    const unsubscribe = store.subscribe(() => { });

    store.dispatch(playersActions.loadFromLocalStorage());

    unsubscribe();

};

export { storeInitializer };
