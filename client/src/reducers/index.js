import { combineReducers } from 'redux';
import goalListReducer from './goalListReducer';
import recordReducer from './recordReducer';

export default combineReducers({
    goals: goalListReducer,
    records: recordReducer
})