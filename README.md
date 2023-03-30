# scramble-component
A [webcomponent](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that tries to recreate the 'hacker' descrambling text effect.

A live demo of this can be found at <https://widumu.github.io/scramble-component/>.

It has the following attributes:
* `content`: A string of text it will descramble into
* `duration`: The number of milliseconds between switching letters. Due to underlying browser limitations, this shouldn't be put lower than 4.
* `charset`: The string of valid characters to use for the 'random' letters.
* `cycles`: Number of times to randomize a letter before going to the correct one
* `single-letter`: A boolean that defines whehter to ranomize the entire string, or just the next revealed one. Note that as a HTML boolean, it being defined at all means that it is considered `true`