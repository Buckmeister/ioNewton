import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "../store/app.state";
import { setInput, resetValues } from "../store/actions/sqrt.actions";

import { IonInput, ToastController } from "@ionic/angular";

@Component({
  selector: "app-content",
  templateUrl: "./content.page.html",
  styleUrls: ["./content.page.scss"],
})
export class ContentPage implements OnInit, AfterViewInit {
  public contentId: string;

  @ViewChild(IonInput, { static: true }) inputElement: IonInput;
  showAbout: boolean;

  input$: Observable<number>;
  output$: Observable<number>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private toastController: ToastController
  ) {
    this.input$ = store.pipe(select((state) => state.sqrt.input));
    this.output$ = store.pipe(select((state) => state.sqrt.output));
  }

  ngAfterViewInit() {
    this.reactOnNegativeInputValue();
    this.reactOnInputElementIonChange();
  }

  ngOnInit() {
    this.contentId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.contentId === "About") this.showAbout = true;
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

  async dismissErrorOnNegativeInputToast() {
    return await this.toastController.dismiss().catch(() => {});
  }

  reactOnInputElementIonChange() {
    this.inputElement.ionChange.subscribe((event: CustomEvent) => {
      const targetValue = +(event.target as HTMLInputElement).value;
      this.store.dispatch(setInput({ value: targetValue }));
    });
  }
}
