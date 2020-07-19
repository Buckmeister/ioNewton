import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { ContentPage } from "./content.page";
import { provideMockStore } from "@ngrx/store/testing";

describe("ContentPage", () => {
  let component: ContentPage;
  let fixture: ComponentFixture<ContentPage>;

  beforeEach(async(() => {
    const initialState = { sqrt: { input: 0, output: 0 } };

    TestBed.configureTestingModule({
      declarations: [ContentPage],
      providers: [provideMockStore({ initialState })],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
