var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var MatrixText = /** @class */ (function () {
    function MatrixText(el, options, callback) {
        this.defaultOptions = {
            rollNum: 16,
            interval: 5,
            rollFrame: 2,
        };
        this._frame = 0;
        this._time = 0;
        this._isLast = false;
        this._textLen = 0;
        this._textObjArr = [];
        this._fontArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890‘?’“!”(%)[#]{@}/&<-+÷×=>:;,.*".split("");
        if (!el)
            throw new Error("Element do not exist.");
        this._el = el;
        this._options = __assign(__assign({}, this.defaultOptions), options);
        if (callback)
            this._callback = callback;
        this._init();
    }
    Object.defineProperty(MatrixText.prototype, "ramdomText", {
        get: function () {
            return this._fontArr[Math.floor(Math.random() * this._fontArr.length)];
        },
        enumerable: false,
        configurable: true
    });
    MatrixText.prototype._init = function () {
        console.dir(this._el);
        var textArr = this._el.innerText.split("");
        var dispText = "";
        this._time = 0;
        this._textObjArr = [];
        for (var i = 0; i < textArr.length; i++) {
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
    };
    MatrixText.prototype._render = function () {
        var _this = this;
        var dispText = "";
        for (var i = 0; i < this._textLen; i++) {
            var textObj = this._textObjArr[i];
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
                }
                else {
                    textObj.str = textObj.goalStr;
                    // 終わり
                    this._isLast = i === this._textLen - 1;
                }
            }
            dispText += textObj.str;
        }
        this._el.innerHTML = dispText;
        if (this._isLast) {
            setTimeout(function () {
                if (_this._callback)
                    _this._callback();
                _this.destroy();
            });
        }
    };
    MatrixText.prototype.start = function () {
        if (this._isLast)
            return;
        this._time++;
        this._render();
        this._frame = requestAnimationFrame(this.start.bind(this));
    };
    MatrixText.prototype.reset = function () {
        this._time = 0;
        this._isLast = false;
        this._init();
    };
    MatrixText.prototype.destroy = function () {
        cancelAnimationFrame(this._frame);
    };
    return MatrixText;
}());
export { MatrixText };
