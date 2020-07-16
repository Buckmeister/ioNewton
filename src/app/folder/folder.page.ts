import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NewtonApproximator as Newton } from "../newton/approximator";

import { Action } from "../redux/Action";
import { Reducer } from "../redux/Reducer";
import { Store } from "../redux/Store";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;
  store: Store<number>;
  inputValue: number;
  resultValue: number;

  onInputChange() {
    this.store.dispatch({ type: "SET_INPUT", payload: this.inputValue });
  }

  constructor(private activatedRoute: ActivatedRoute) {
    let reducer: Reducer<number> = (state: number, action: Action) => {
      switch (action.type) {
        case "SET_INPUT":
          return action.payload;
        default:
          return state;
      }
    };
    this.store = new Store<number>(reducer, 0);
    this.store.subscribe(() => {
      this.inputValue = this.store.getState();
      this.resultValue = Newton.sqrt(this.store.getState());
    });

    // Uncomment to set state "externally" to 1024 after ten seconds.
    /* setTimeout(() => { */
    /*   this.store.dispatch({ type: "SET_INPUT", payload: 1024 }); */
    /* }, 10000); */
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
