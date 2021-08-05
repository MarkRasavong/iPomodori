import { combineReducers } from 'redux';
import goalListReducer from './goalListReducer';

export default combineReducers({
    goals: goalListReducer,
})