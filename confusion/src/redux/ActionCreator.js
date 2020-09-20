import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes'; //making actionCreator supply this info to dishes reducer
import {baseUrl} from '../shared/baseUrl';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

export const addComment = (comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : comment
});
//action creator is returning a plain js object that has type of action and payload(info for the action to work on)
//send this action to the store for dispatching
//since actions needs to be done only on comments.js (reducer in redux), import this , there.

//this is aslo a thunk ,  returns a function
export const postComment = (dishId , rating , author , comment) => (dispatch) => {
        const newComment = {
          dishId: dishId,
          rating: rating,
          author: author,
          comment: comment
      };
      newComment.date = new Date().toISOString();

      return fetch(baseUrl + 'comments',{
        method : 'POST',
        body : JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      //after this operation obviously you'll receive a response from the server
      
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
      //server includes a new id and sends back the updated comment , received as param : response
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const postFeedback = (firstname , lastname , telnum , email, agree, contactType ,message) => (dispatch) => {
  const newFeedback = {
    firstname : firstname,
    lastname : lastname,
    telnum : telnum,
    email : email,
    agree:agree,
    contactType : contactType,
    message : message
};
newFeedback.date = new Date().toISOString();

return fetch(baseUrl + 'feedback',{
  method : 'POST',
  body : JSON.stringify(newFeedback),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
})
//after this operation obviously you'll receive a response from the server

.then(response => {
  if (response.ok) {
    return response;
  } else {
    var error = new Error('Error ' + response.status + ': ' + response.statusText);
    error.response = response;
    throw error;
  }
},
error => {
      throw error;
})
//server includes a new id and sends back the updated comment , received as param : response
.then(response => response.json())
.then(response => {console.log(JSON.stringify(response)); alert(JSON.stringify(response));})
.catch(error =>  { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};


 
//fetchDishes is defined as a THUNK  which returns a function that has access to dispatch and state
export const fetchDishes = () => (dispatch) => {
    
  dispatch(dishesLoading())

  return fetch(baseUrl + 'dishes')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(dishes => dispatch(addDishes(dishes)))
  .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});


export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
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
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
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

export const fetchLeaders = () => (dispatch) => {
    
  dispatch(leadersLoading());

  return fetch(baseUrl + 'leaders')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(leaders => dispatch(addLeaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});
