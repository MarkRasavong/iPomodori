import _ from 'lodash';
import { ADD_GOAL, REMOVE_GOAL, RETRIEVE_GOALS} from '../actions/types';

export default ( state = [], action ) => {
    switch(action.type){
        case ADD_GOAL:
            return [...state, action.payload];
        case RETRIEVE_GOALS:
            return action.payload;
        case REMOVE_GOAL:
            return state.filter(goal => goal._id !== action.payload);
        default:
            return state
    }
}