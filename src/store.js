import {createStore, applyMiddleware, compose} from 'redux';// applyMiddleware se necesita porque se usa thunk
import thunk from 'redux-thunk';
import reducer from './reducers'; // no hace falta indicar /index porque por defecto busca un index

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),

        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;