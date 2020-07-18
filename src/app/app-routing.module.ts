import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "content/SquareRoot",
    pathMatch: "full",
  },
  {
    path: "about",
    redirectTo: "content/About",
    pathMatch: "full",
  },
  {
    path: "content/:id",
    loadChildren: () =>
      import("./content/content.module").then((m) => m.ContentPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
