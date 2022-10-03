import { store, playersActions } from 'store';

const storeInitializer = function () {

    const unsubscribe = store.subscribe(() => { });

    store.dispatch(playersActions.loadFromLocalStorage());
    // store.dispatch(boardActions.fetch());

    unsubscribe();

};

export { storeInitializer };
