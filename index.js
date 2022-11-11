const redux = require("redux");
const createStore = redux.createStore;

const CAKE_ORDERED = "CAKE_ORDERED";
const RESTOCK_CAKE = "RESTOCK_CAKE";

/* Actions */
const orderCake = () => {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
};

const restockCake = (payload) => {
  return {
    type: RESTOCK_CAKE,
    quantity: payload,
  };
};

/* Store */
const initialState = {
  numOfCakes: 10,
  numOfDrinks: 22,
};

/* Reducers */
// (previousState, action) => newState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.quantity,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

console.log("initial state ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("update state ", store.getState())
);

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(2));
store.dispatch(restockCake(2));
store.dispatch(restockCake(2));
store.dispatch(restockCake(2));

unsubscribe();
