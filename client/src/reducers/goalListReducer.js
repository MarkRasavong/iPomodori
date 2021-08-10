import _ from 'lodash';
import { ADD_GOAL, REMOVE_GOAL, RETRIEVE_GOALS, RETRIEVE_POMODORI, SEND_RECORDS} from '../actions/types';

export default ( state = {}, action ) => {
    switch(action.type){
        case ADD_GOAL:
            return {...state, [action.payload.id]: action.payload};
        case RETRIEVE_GOALS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case REMOVE_GOAL:
            return _.omit(state, action.payload);
        case SEND_RECORDS:
            return {...state, [action.payload.id] : action.payload};
        case RETRIEVE_POMODORI:
            return { ...state, ..._.mapKeys (action.payload, 'id')};
        default:
            return state
    }
}