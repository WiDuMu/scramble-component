"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Scramble_content, _Scramble_duration, _Scramble_interval, _Scramble_cycles, _Scramble_completeLetters, _Scramble_completeCycles, _Scramble_charset, _Scramble_singleLetter;
class Scramble extends HTMLElement {
    /** An element that scrambles the text inside it */
    constructor() {
        super();
        _Scramble_content.set(this, void 0);
        /** The duration of the interval in millisenconds */
        _Scramble_duration.set(this, void 0);
        /** The interval used to update the scramble */
        _Scramble_interval.set(this, void 0);
        /** Number of cycles to go through for each letter in scramble effect */
        _Scramble_cycles.set(this, void 0);
        /** Countdown */
        _Scramble_completeLetters.set(this, void 0);
        /** Completed cycles */
        _Scramble_completeCycles.set(this, void 0);
        /** A string which provides the valid characters to use in the scramble effect. */
        _Scramble_charset.set(this, void 0);
        /** Whether to randomize all letters or just the next revealed letter */
        _Scramble_singleLetter.set(this, void 0);
        /** Returns a random string of specified length from the character set supplied */
        this.randomString = (length, alphabet) => Array.from({ length: length }, _ => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
        this.singleLetter = this.getAttribute('single-letter');
        this.duration = this.getAttribute('interval');
        this.charset = this.getAttribute('charset');
        this.cycles = this.getAttribute('cycles');
        this.content = this.getAttribute('content');
    }
    /** Updates a string */
    update() {
        var _a, _b;
        __classPrivateFieldSet(this, _Scramble_completeCycles, (_a = __classPrivateFieldGet(this, _Scramble_completeCycles, "f"), _a++, _a), "f");
        if (__classPrivateFieldGet(this, _Scramble_completeCycles, "f") >= __classPrivateFieldGet(this, _Scramble_cycles, "f")) {
            if (__classPrivateFieldGet(this, _Scramble_completeLetters, "f") >= __classPrivateFieldGet(this, _Scramble_content, "f").length) { // If we have run through all cycles
                clearInterval(__classPrivateFieldGet(this, _Scramble_interval, "f")); // Stop running the interval
                this.textContent = __classPrivateFieldGet(this, _Scramble_content, "f"); // Set the text content to it's final value
                return;
            }
            __classPrivateFieldSet(this, _Scramble_completeCycles, 0, "f"); // Otherwise, reset the cycle, increment the letters, and keep going
            __classPrivateFieldSet(this, _Scramble_completeLetters, // Otherwise, reset the cycle, increment the letters, and keep going
            (_b = __classPrivateFieldGet(this, _Scramble_completeLetters, "f"), _b++, _b), "f");
        }
        let randomText;
        if (__classPrivateFieldGet(this, _Scramble_singleLetter, "f")) {
            randomText = this.randomString(1, __classPrivateFieldGet(this, _Scramble_charset, "f")).padEnd(__classPrivateFieldGet(this, _Scramble_content, "f").length - __classPrivateFieldGet(this, _Scramble_completeLetters, "f")); // Place a single random char at the end
        }
        else {
            randomText = this.randomString(__classPrivateFieldGet(this, _Scramble_content, "f").length - __classPrivateFieldGet(this, _Scramble_completeLetters, "f"), __classPrivateFieldGet(this, _Scramble_charset, "f")); // Fill in unrevealed text with random chars
        }
        this.textContent = __classPrivateFieldGet(this, _Scramble_content, "f").slice(0, __classPrivateFieldGet(this, _Scramble_completeLetters, "f")) + randomText;
    }
    /** Sets what attributes we actually care about */
    static get observedAttributes() {
        return ['content', 'cycles', 'interval', 'charset'];
    }
    set singleLetter(i) {
        __classPrivateFieldSet(this, _Scramble_singleLetter, (i !== null), "f"); // If the attribute is defined at all, it's considered true
    }
    set duration(i) {
        clearInterval(__classPrivateFieldGet(this, _Scramble_interval, "f"));
        if (i === null) {
            __classPrivateFieldSet(this, _Scramble_duration, 50, "f");
        }
        else {
            __classPrivateFieldSet(this, _Scramble_duration, parseInt(i), "f");
        }
        if (!(__classPrivateFieldGet(this, _Scramble_completeCycles, "f") >= __classPrivateFieldGet(this, _Scramble_cycles, "f"))) { // If the interval isn't finished
            __classPrivateFieldSet(this, _Scramble_interval, setInterval(this.update.bind(this), __classPrivateFieldGet(this, _Scramble_duration, "f")), "f");
        }
    }
    set cycles(i) {
        if (i === null) {
            __classPrivateFieldSet(this, _Scramble_cycles, 5, "f");
            return;
        }
        else {
            __classPrivateFieldSet(this, _Scramble_cycles, parseInt(i), "f");
        }
    }
    set content(i) {
        clearInterval(__classPrivateFieldGet(this, _Scramble_interval, "f"));
        __classPrivateFieldSet(this, _Scramble_completeCycles, __classPrivateFieldSet(this, _Scramble_completeLetters, 0, "f"), "f");
        if (i === null) {
            this.textContent = '';
            return;
        }
        console.log(i);
        __classPrivateFieldSet(this, _Scramble_content, i, "f");
        __classPrivateFieldSet(this, _Scramble_interval, setInterval(this.update.bind(this), __classPrivateFieldGet(this, _Scramble_duration, "f")), "f");
    }
    set charset(i) {
        if (i === null) {
            __classPrivateFieldSet(this, _Scramble_charset, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ(){}\\|/[]*#@!%$^&', "f");
            return;
        }
        __classPrivateFieldSet(this, _Scramble_charset, i, "f");
    }
    /** If a attribute gets changed, this function is called. */
    attributeChangedCallback(attribute, previousValue, currentValue) {
        if (attribute === 'content') {
            __classPrivateFieldSet(this, _Scramble_content, currentValue, "f");
            return;
        }
        if (attribute === 'cycles') {
            this.cycles = currentValue;
            return;
        }
        if (attribute === 'duration') {
            this.duration = currentValue;
            return;
        }
        if (attribute === 'charset') {
            this.charset = currentValue;
            return;
        }
    }
}
_Scramble_content = new WeakMap(), _Scramble_duration = new WeakMap(), _Scramble_interval = new WeakMap(), _Scramble_cycles = new WeakMap(), _Scramble_completeLetters = new WeakMap(), _Scramble_completeCycles = new WeakMap(), _Scramble_charset = new WeakMap(), _Scramble_singleLetter = new WeakMap();
customElements.define('scramble-span', Scramble);
