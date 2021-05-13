interface Options {
  rollNum: number;
  interval: number;
  rollFrame: number;
}

interface textAnimeProperty {
  str: string;
  goalStr: string;
  rollNum: number;
  delay: number;
}

class MatrixText {
  private defaultOptions: Readonly<Options> = {
    rollNum: 16,
    interval: 5,
    rollFrame: 2,
  };

  private _el: HTMLElement;
  private _options: Options;
  private _callback;
  private _frame = 0;
  private _time = 0;
  private _isLast = false;
  private _textLen = 0;
  private _textObjArr: textAnimeProperty[] = [];
  private _fontArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890‘?’“!”(%)[#]{@}/&<-+÷×=>:;,.*".split(
    "",
  );

  constructor(el: HTMLElement, options?: Partial<Options>, callback?: () => void) {
    if (!el) throw new Error("Element do not exist.");

    this._el = el;
    this._options = { ...this.defaultOptions, ...options };
    if (callback) this._callback = callback;

    this._init();
  }

  private get ramdomText() {
    return this._fontArr[Math.floor(Math.random() * this._fontArr.length)];
  }

  private _init(): void {
    console.dir(this._el);
    const textArr = this._el.innerText.split("");
    let dispText = "";

    this._time = 0;
    this._textObjArr = [];

    for (let i = 0; i < textArr.length; i++) {
      this._textObjArr.push({
        str: " ",
        goalStr: textArr[i],
        rollNum: this._options.rollNum,
        delay: this._options.interval * i,
      });

      dispText += " ";
    }
    this._textLen = this._textObjArr.length;
    this._el.textContent = dispText;
  }

  private _render(): void {
    let dispText = "";

    for (let i = 0; i < this._textLen; i++) {
      const textObj = this._textObjArr[i];
      // 改行だったら
      if (textObj.goalStr === "\n") {
        dispText += "<br>";
        continue;
      }

      if (textObj.delay < this._time) {
        if (textObj.rollNum > 0) {
          if (Math.floor(this._time) % this._options.rollFrame === 0) {
            textObj.str = this.ramdomText;
            textObj.rollNum--;
          }
        } else {
          textObj.str = textObj.goalStr;

          // 終わり
          this._isLast = i === this._textLen - 1;
        }
      }
      dispText += textObj.str;
    }
    this._el.innerHTML = dispText;

    if (this._isLast) {
      setTimeout(() => {
        if (this._callback) this._callback();
        this.destroy();
      });
    }
  }

  start(): void {
    if (this._isLast) return;

    this._time++;
    this._render();

    this._frame = requestAnimationFrame(this.start.bind(this));
  }

  reset(): void {
    this._time = 0;
    this._isLast = false;
    this._init();
  }

  destroy(): void {
    cancelAnimationFrame(this._frame);
  }
}

export { MatrixText };
