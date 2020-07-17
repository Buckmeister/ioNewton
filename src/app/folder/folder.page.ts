import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../store/app.state";
import { setInput, reset } from "../store/actions/sqrt.actions";
import { IonInput } from "@ionic/angular";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit, AfterViewInit {
  public folder: string;

  @ViewChild(IonInput, { static: true }) inputElement: IonInput;

  input$: Observable<number>;
  output$: Observable<number>;

  onResetClick() {
    this.store.dispatch(reset());
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.input$ = store.pipe(select((state) => state.sqrt.input));
    this.output$ = store.pipe(select((state) => state.sqrt.output));
  }

  ngAfterViewInit() {
    this.inputElement.ionChange.subscribe((event: CustomEvent) => {
      this.store.dispatch(
        setInput({ value: +(event.target as HTMLInputElement).value })
      );
    });
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
