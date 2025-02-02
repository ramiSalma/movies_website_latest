import { createStore } from "redux";
import { Reducer } from "./reducer";

export const Store = createStore(Reducer , Window.REDUX__DEVTOOLS__EXSTENSION && Window.REDUX__DEVTOOLS__EXSTENSION())