import { useDispatch } from "react-redux";

/* Core */
import { AnyAction } from "redux";

/* Instruments */
import { ThunkDispatch } from "redux-thunk";
import { rootReducer } from "../store";

export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
