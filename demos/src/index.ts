import { MatrixText } from "text-anime-utils";

function initMatrixTest(): void {
  const targetEl = document.getElementById("js-matrix-text") as HTMLDivElement;
  const customConfig = {
    rollNum: 10,
    interval: 3,
    rollFrame: 2,
  };
  const matrixTextInstance = new MatrixText(targetEl, customConfig, () => {
    alert("End animation.");
  });
  matrixTextInstance.start();
}

initMatrixTest();
