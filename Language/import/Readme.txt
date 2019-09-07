Future evolution of `import`
============================

Consider the following scenarios:

* A script wants to import some .wasm executable.
* A script wants to import some .json object.
* A script wants to import some .html fragment.

We must not solve each of these scenarios per se,
but we must find a common solution that addresses all of these use-cases.

I see two possible solutions:

Either we use TLA (Top Level Await) to write wrapper-scripts,
like my-prog.wasm.js, that loads the respective underlying resource
for us to import it like `import {myFunc} from './my-prog.wasm.js'`.

Or we enable some mechanism for the user to specify arbitrary formats for importing.
The user can then write his own methods to import JSON/WASM/HTML given an url, depending on his needs.
Here, no wrappers are needed.

