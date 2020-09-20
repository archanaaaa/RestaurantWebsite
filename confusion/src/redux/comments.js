import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        //since you cannot mutate the state...
        return { ...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};

//changes are not persisted here, once the application restarts the added comment in memory gets lost 