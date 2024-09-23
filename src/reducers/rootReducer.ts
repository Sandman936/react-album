import { combineReducers } from "redux";
import { cardsSlice } from "../services/slices/cardsSlice";

const rootReducer = combineReducers({
    [cardsSlice.name] : cardsSlice.reducer,
});

export default rootReducer;