import { combineReducers } from 'redux';
import filter from './filter';
import { mk52 } from "./mk52";

export default combineReducers({
    mk52,
    filter,
});
