declare class Scramble extends HTMLElement {
    #private;
    /** An element that scrambles the text inside it */
    constructor();
    /** Returns a random string of specified length from the character set supplied */
    private randomString;
    /** Updates a string */
    private update;
    /** Sets what attributes we actually care about */
    static get observedAttributes(): string[];
    set singleLetter(i: string | null);
    set duration(i: string | null);
    set cycles(i: string | null);
    set content(i: string | null);
    set charset(i: string | null);
    /** If a attribute gets changed, this function is called. */
    attributeChangedCallback(attribute: string, previousValue: string, currentValue: string): void;
}
