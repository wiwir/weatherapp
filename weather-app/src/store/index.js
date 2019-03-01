import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./../reducers";

const initialState = {
  city: "New York,us"
};

//Herramienta de debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk)) //applyMiddleware para incorporar lso middleware, en este caso usamos thunk
);
