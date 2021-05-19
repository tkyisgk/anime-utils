import { MatrixText } from "./MatrixText";

describe("MatrixText", (): void => {
  test("An error should occur if element do not passed correctly.", (): void => {
    const el = document.getElementById("js-not-exist-el") as HTMLDivElement;
    expect(() => new MatrixText(el)).toThrow();
  });
});
