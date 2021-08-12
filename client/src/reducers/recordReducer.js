import _ from 'lodash';
import { SEND_RECORDS, RETRIEVE_POMODORI, DELETE_POMODRO } from '../actions/types';

export default ( state = {}, action ) => {
    switch(action.type){
        case SEND_RECORDS:
            return {...state, [action.payload.id] : action.payload};
        case RETRIEVE_POMODORI:
            return { ...state, ..._.mapKeys (action.payload, 'goalName')};
        case DELETE_POMODRO:
            return _.omit(state, action.payload);
        default:
            return state
    }
}