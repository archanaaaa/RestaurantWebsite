import * as ActionTypes from './ActionTypes';

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