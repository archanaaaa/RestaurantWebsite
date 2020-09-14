import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = {
    dishes: DISHES,
    comments : COMMENTS,
    leaders : LEADERS,
    promotions : PROMOTIONS
};

export const Reducer = (state = initialState , action) => { 
    return state;
};

//state=initialState , ES6 way of specifying default value , initially when the reducer fn is called
    