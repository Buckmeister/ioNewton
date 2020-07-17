import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../store/app.state";
import { setInput, reset } from "../store/actions/sqrt.actions";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;

  input$: Observable<number>;
  output$: Observable<number>;

  onInputChange(event) {
    this.input$.subscribe((currentStateValue) => {
      if (currentStateValue !== event.target.value) {
        this.store.dispatch(setInput({ value: event.target.value }));
      }
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.input$ = store.pipe(select((state) => state.sqrt.input));
    this.output$ = store.pipe(select((state) => state.sqrt.output));
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
