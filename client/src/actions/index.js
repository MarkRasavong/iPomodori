import goals from '../apis/goals';
import { 
    ADD_GOAL,
    REMOVE_GOAL,
    RETRIEVE_GOALS,
    SEND_RECORDS,
    RETRIEVE_POMODORI,
    DELETE_POMODRO,
    SELECTED,
    NOT_SELECTED
 } from './types';

 export const addGoal = (goal) => async dispatch => {
    const response = await goals.post('/saveTask', goal)

     dispatch({ type: ADD_GOAL, payload: response.data})
 };

 export const retrieveGoals = () => async dispatch => {
     const response = await goals.get('/getTasks');

     dispatch({type: RETRIEVE_GOALS, payload: response.data})
 };

 export const deleteGoal = id => async dispatch => {
     await goals.delete(`/goals/${id}`)

     dispatch({ type: REMOVE_GOAL, payload: id })
 };

 export const sendRecords = values => async dispatch => {
     const response = await goals.post('/records', {...values});

     dispatch({type: SEND_RECORDS, payload: response.data});
 }

 export const retrievePomodori = () => async dispatch => {
     const response = await goals.get('/records');

     dispatch({type: RETRIEVE_POMODORI, payload: response.data})
 }

 export const deletePomodoro = record => async dispatch => {
     await goals.delete(`/records/${record.id}`);
     dispatch({ type: DELETE_POMODRO, payload: record })
 }

export const selected = () => {
  return {
    type: SELECTED
  };
};

export const notSelected = () => {
  return {
    type: NOT_SELECTED,
  };
};
