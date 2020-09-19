import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes'; //making actionCreator supply this info to dishes reducer
import {baseUrl} from '../shared/baseUrl';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

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

    /*this is a simulation for communicating with the server
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    },2000);
    */

    //actual communication
    return fetch(baseUrl + 'dishes') // 'baseurl/dishes'
        .then(response => response.json()) //once json file is created it will be available for the nect call back function, accesed here through dishes parameter
        .then(dishes => dispatch(addDishes(dishes)));
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


export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
