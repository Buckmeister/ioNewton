import { createAction, props } from "@ngrx/store";

export const setInput = createAction(
  "[sqrt] SET_INPUT",
  props<{ value: number }>()
);
export const resetValues = createAction("[sqrt] RESET_VALUES");
