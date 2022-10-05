import { store, playersActions, imageActions } from 'store';

const storeInitializer = function () {

    try {

        const unsubscribe = store.subscribe(() => { });

        store.dispatch(playersActions.loadFromLocalStorage());

        store.dispatch(imageActions.fetch());

        unsubscribe();

    } catch (error) {

        console.error(error);

    }


};

export { storeInitializer };
