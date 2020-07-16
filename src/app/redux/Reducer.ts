import { Action } from "./Action";

export interface Reducer<T> {
  (state: T, action: Action): T;
}
