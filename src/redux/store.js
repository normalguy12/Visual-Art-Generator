import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./idReducer"
import renderReducer from "./renderReducer";
import operatorReducer from "./operatorReducer";
import animationReducer from "./animationReducer";
import audioReducer from "./audioReducer";

export default configureStore({
  reducer:{
    idGet: idReducer,
    renderGet: renderReducer,
    operatorGet: operatorReducer,
    animationGet: animationReducer,
    audioGet: audioReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})