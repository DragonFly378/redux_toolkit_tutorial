const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";

/* Actions */
const orderCake = (payload = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: payload,
  };
};

const restockCake = (payload = 1) => {
  return {
    type: RESTOCK_CAKE,
    payload: payload,
  };
};

const orderIceCream = (payload = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: payload,
  };
};

const restockIceCream = (payload = 1) => {
  return {
    type: RESTOCK_ICECREAM,
    payload: payload,
  };
};

/* Store */
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 22,
};

/* Reducers */
// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case RESTOCK_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer);
console.log("initial state ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("update state ", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(2));
// store.dispatch(restockCake(2));
// store.dispatch(restockCake(2));
// store.dispatch(restockCake(2));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.restockCake();
actions.restockCake(2);
actions.restockCake(5);
actions.orderCake();
actions.orderIceCream();
actions.restockIceCream(3);

unsubscribe();
