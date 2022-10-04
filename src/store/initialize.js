import { store, playersActions, imageActions } from 'store';

const storeInitializer = function () {

    const unsubscribe = store.subscribe(() => { });

    store.dispatch(playersActions.loadFromLocalStorage());
    store.dispatch(imageActions.fetch());

    unsubscribe();

};

export { storeInitializer };
