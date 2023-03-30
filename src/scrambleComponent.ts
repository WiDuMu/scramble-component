export class Scramble extends HTMLElement {
    #content: string;
    /** The duration of the interval in millisenconds */
    #duration: number
    /** The interval used to update the scramble */
    #interval: number;
    /** Number of cycles to go through for each letter in scramble effect */
    #cycles: number;
    /** Countdown */
    #completeLetters: number;
    /** Completed cycles */
    #completeCycles: number;
    /** A string which provides the valid characters to use in the scramble effect. */
    #charset: string;
    /** Whether to randomize all letters or just the next revealed letter */
    #singleLetter: boolean;
    /** An element that scrambles the text inside it */
    constructor() {
        super();
        this.singleLetter = this.getAttribute('single-letter');
        this.duration = this.getAttribute('interval');
        this.charset = this.getAttribute('charset');
        this.cycles = this.getAttribute('cycles');
        this.content = this.getAttribute('content'); 
    }
    /** Returns a random string of specified length from the character set supplied */
    private randomString = (length: number, alphabet: string): string => Array.from({ length: length }, _ => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
    /** Updates a string */
    private update() {
        this.#completeCycles++;
        if (this.#completeCycles >= this.#cycles) {
            if (this.#completeLetters >= this.#content.length) { // If we have run through all cycles
                clearInterval(this.#interval); // Stop running the interval
                this.textContent = this.#content; // Set the text content to it's final value
                return;
            }
            this.#completeCycles = 0; // Otherwise, reset the cycle, increment the letters, and keep going
            this.#completeLetters++;
        }
        let randomText: string
        if (this.#singleLetter) {
            randomText = this.randomString(1, this.#charset).padEnd(this.#content.length - this.#completeLetters); // Place a single random char at the end
        } else {
            randomText = this.randomString(this.#content.length - this.#completeLetters, this.#charset); // Fill in unrevealed text with random chars
        }
        this.textContent = this.#content.slice(0, this.#completeLetters) + randomText;
    }
    /** Sets what attributes we actually care about */
    static get observedAttributes() {
        return ['content', 'cycles', 'interval', 'charset'];
    }
    set singleLetter(i: string | null) {
        this.#singleLetter = (i !== null); // If the attribute is defined at all, it's considered true
    }
    set duration(i: string | null) {
        clearInterval(this.#interval);
        if (i === null) {
            this.#duration = 50;
        } else {
            this.#duration = parseInt(i);
        }
        if (!(this.#completeCycles >= this.#cycles)) { // If the interval isn't finished
            this.#interval = setInterval(this.update.bind(this), this.#duration);
        }
    }
    set cycles(i: string | null) {
        if (i === null) {
            this.#cycles = 5;
            return
        } else {
            this.#cycles = parseInt(i);
        }
    }
    set content(i: string | null) {
        clearInterval(this.#interval);
        this.#completeCycles = this.#completeLetters = 0;
        if (i === null) {
            this.textContent = '';
            return
        }
        console.log(i)
        this.#content = i;
        this.#interval = setInterval(this.update.bind(this), this.#duration);
    }
    set charset(i: string | null) {
        if (i === null) {
            this.#charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ(){}\\|/[]*#@!%$^&';
            return
        }
        this.#charset = i;
    }
    /** If a attribute gets changed, this function is called. */
    attributeChangedCallback(attribute: string, previousValue: string, currentValue: string) {
        if (attribute === 'content') {
            this.#content = currentValue;
            return
        }
        if (attribute === 'cycles') {
            this.cycles = currentValue;
            return
        }
        if (attribute === 'duration') {
            this.duration = currentValue;
            return
        }
        if (attribute === 'charset') {
            this.charset = currentValue;
            return
        }
    }
}
customElements.define('scramble-span', Scramble);