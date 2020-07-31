import { AppPage } from "./app.po";

describe("new App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe("default screen", () => {
    beforeEach(() => {
      page.navigateTo("/SquareRoot");
    });
    it("should say Newton's Zero Approximation", () => {
      expect(page.getParagraphText()).toContain("Newton's Zero Approximation");
    });
  });
});
