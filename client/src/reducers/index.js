import { combineReducers } from 'redux';
import goalListReducer from './goalListReducer';
import recordReducer from './recordReducer';
import selectedReducer from './selectedReducer';

export default combineReducers({
    goals: goalListReducer,
    records: recordReducer,
    select: selectedReducer
})