import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
    isLoading : true,
    errMess : null,
    dishes : []
}, action) => {
    switch(action.type){
        case ActionTypes.DISHES_LOADING :
            return {...state, isLoading : true , errMess : null, dishes : [] } 
            //... is the spread operator that expands the state
            //statement creates(& makes changes to) new object from the state and returns that object 
        case ActionTypes.DISHES_FAILED :
            return {...state, isLoading : false , errMess : action.payload , dishes : [] } 

        case ActionTypes.ADD_DISHES:
            return {...state, isLoading : false , errMess : null, dishes : action.payload } 

        default:
            return state;
    }
};

