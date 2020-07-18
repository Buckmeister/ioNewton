import { createReducer, on, Action } from "@ngrx/store";
import { setInput, resetValues } from "../actions/sqrt.actions";
import { SqrtState } from "../app.state";

import { NewtonApproximator as Newton } from "../../newton/approximator";

export const initialState: SqrtState = {
  input: 0,
  output: 0,
};

const _sqrtReducer = createReducer(
  initialState,
  on(setInput, (state: SqrtState, { value }) => ({
    input: value,
    output: Newton.sqrt(value),
  })),
  on(resetValues, (state: SqrtState) => ({ input: 0, output: 0 }))
);

export function sqrtReducer(state: SqrtState, action: Action) {
  return _sqrtReducer(state, action);
}
