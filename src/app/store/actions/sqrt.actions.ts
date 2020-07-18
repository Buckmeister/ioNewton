import { createAction, props } from "@ngrx/store";

export const setInput = createAction("SET_INPUT", props<{ value: number }>());
export const resetValues = createAction("RESET");
