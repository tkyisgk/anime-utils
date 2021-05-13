import { MatrixText } from "text-anime-utils";

function initMatrixTest(): void {
  const targetEl = document.getElementById("js-matrix-text") as HTMLDivElement;
  const matrixTextInstance = new MatrixText(targetEl, {}, () => {
    alert("End animation.");
  });
  matrixTextInstance.start();
}

initMatrixTest();
