import goals from '../apis/goals';
import { 
    ADD_GOAL,
    REMOVE_GOAL,
    RETRIEVE_GOALS
 } from './types';

 export const addGoal = goal => async dispatch => {
     const response = await goals.post('/goals', {goal})

     dispatch({ type: ADD_GOAL, payload: response.data })
 };

 export const retrieveGoals = () => async dispatch => {
     const response = await goals.get('/goals');

     dispatch({type: RETRIEVE_GOALS, payload: response.data})
 };

 export const deleteGoal = id => async dispatch => {
     await goals.delete(`/goals/${id}`)

     dispatch({ type: REMOVE_GOAL, payload: id })
 };