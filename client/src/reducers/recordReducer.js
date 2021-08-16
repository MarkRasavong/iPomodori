import _ from 'lodash';
import { SEND_RECORDS, RETRIEVE_POMODORI, DELETE_POMODRO } from '../actions/types';

export default ( state = [], action ) => {
    switch(action.type){
        case SEND_RECORDS:
            return {...state, [action.payload.id] : action.payload};
        case RETRIEVE_POMODORI:
            return action.payload;
        case DELETE_POMODRO:
            return state.filter(pomodoro => pomodoro.goalName !== action.payload);
        default:
            return state
    }
}