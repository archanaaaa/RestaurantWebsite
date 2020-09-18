import { createStore , combineReducers , applyMiddleware} from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Leaders} from './leaders';
import {Promotions} from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore( //since createStore takes enhancer as the second parameter 
                               //and applyMiddleware returns one...
        combineReducers({
            dishes : Dishes,
            comments : Comments,
            leaders : Leaders,
            promotions : Promotions
        }),

        applyMiddleware (thunk,logger) //both thunk and logger are supplied for enhancing our store
        

    );
        return store;
}