interface Options {
    rollNum: number;
    interval: number;
    rollFrame: number;
}
declare class MatrixText {
    private defaultOptions;
    private _el;
    private _options;
    private _callback;
    private _frame;
    private _time;
    private _isLast;
    private _textLen;
    private _textObjArr;
    private _fontArr;
    constructor(el: HTMLElement, options?: Partial<Options>, callback?: () => void);
    private get ramdomText();
    private _init;
    private _render;
    start(): void;
    reset(): void;
    destroy(): void;
}
export { MatrixText };
