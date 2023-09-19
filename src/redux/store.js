import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./idReducer"
import renderReducer from "./renderReducer";
import operatorReducer from "./operatorReducer";
import animationReducer from "./animationReducer";

export default configureStore({
  reducer:{
    idGet: idReducer,
    renderGet: renderReducer,
    operatorGet: operatorReducer,
    animationGet: animationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})