import { createStore , combineReducers , applyMiddleware} from 'redux';
import {createForms } from 'react-redux-form';
//cerateForms enables us to add form state to the store 
import {InitialFeedback} from './forms.js';

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
            promotions : Promotions,
            ...createForms ({ //automatically add the necessary reducer functions & the info into create store
                feedback : InitialFeedback
            })
        }),

        applyMiddleware (thunk,logger) //both thunk and logger are supplied for enhancing our store
        

    );
        return store;
}