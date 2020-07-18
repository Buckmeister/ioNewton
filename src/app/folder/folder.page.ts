import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../store/app.state";
import { setInput, resetValues } from "../store/actions/sqrt.actions";
import { IonInput, ToastController } from "@ionic/angular";

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

  constructor(
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.input$ = store.pipe(select((state) => state.sqrt.input));
    this.output$ = store.pipe(select((state) => state.sqrt.output));
  }

  ngAfterViewInit() {
    this.reactOnNegativeInputValue();
    this.reactOnInputElementIonChange();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }

  onResetClick() {
    this.store.dispatch(resetValues());
  }

  reactOnNegativeInputValue() {
    this.input$.subscribe((newValue) => {
      if (newValue < 0) {
        this.presentErrorOnNegativeInputToast();
      } else {
        this.dismissErrorOnNegativeInputToast();
      }
    });
  }
  presentErrorOnNegativeInputToast() {
    this.dismissErrorOnNegativeInputToast();
    this.toastController
      .create({
        header: "Warning:",
        message: "Please provide a non-negative value.",
        position: "top",
        color: "danger",
        translucent: true,
        buttons: [
          {
            text: "Close",
            role: "Cancel",
          },
        ],
      })
      .then((toast) => {
        toast.present();
      });
  }

  dismissErrorOnNegativeInputToast() {
    this.toastController.dismiss().catch(() => {});
  }

  reactOnInputElementIonChange() {
    this.inputElement.ionChange.subscribe((event: CustomEvent) => {
      const targetValue = +(event.target as HTMLInputElement).value;
      this.store.dispatch(setInput({ value: targetValue }));
    });
  }
}
