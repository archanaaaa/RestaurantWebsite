import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes'; //making actionCreator supply this info to dishes reducer

export const addComment = (dishId , rating , author , comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }
});
//action creator is returning a plain js object that has type of action and payload(info for the action to work on)
//send this action to the store for dispatching
//since actions needs to be done only on comments.js (reducer in redux), import this , there.


//fetchDishes is defined as a THUNK  which returns a function that has access to dispatch and state
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    },2000);
}

export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING,
    //this action function returns an action object with just the type
});

export const dishesFailed = (errmess) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errmess
});

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
});  