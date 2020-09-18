import { act } from 'react-dom/test-utils';
import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT :
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            //since you cannot mutate the state...
            return state.concat(comment);
        default:
            return state;
    }
};

//changes are not persisted here, once the application restarts the added comment in memory gets lost 