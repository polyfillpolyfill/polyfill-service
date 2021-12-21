# polyfill.io VCL ported to JavaScript

This is a near direct port of <https://github.com/Financial-Times/polyfill-service/tree/master/fastly/vcl>.

To run this project:
- Clone the repository and change into the repository directory
- Run `npm install`
- Run `npm run dev`
- Visit `http://127.0.0.1:7676/` in your browser

# Differences between the VCL and the JavaScript

- In VCL we can detect the health of a backend server via the `req.backend.healthy` field without having to make a request to the backend. There is no JavaScript equivalent to `req.backend.healthy.`, we can only know about the health of a backend by making a request to the backend server.

- In VCL we have [`fastly.ff.visits_this_service`](https://developer.fastly.com/reference/vcl/variables/miscellaneous/fastly-ff-visits-this-service/) which is a very useful field to have for services which use [Shielding](https://developer.fastly.com/learning/concepts/shielding/) such as polyfill.io. There is no JavaScript equivalent.

- There is no shielding in c@e, which means there is no shielding in the JavaScript implementation
- There is no fastly-ssl header in c@e

# Issues with fastly/js-compute-runtime

- If using `@financial-times/polyfill-useragent-normaliser` or `useragent_parser`, the compiler will error with "too much recursion" (<https://github.com/fastly/js-compute-runtime/issues/1>). This project has an internal fork of both packages with modifications to make them work with the compiler.

- I could not get `fetch` to work correctly with a Request instance but it would work correctly with a String instance. I.E. `fetch(request, {backend: request.backend})` would not work but `fetch(request.url, {backend: request.backend})` would work.

- It's very odd to have the [console methods only accept one parameter](https://github.com/fastly/js-compute-runtime/blob/ec94553de56287e925216ecaf635bbae3a87d77d/c-dependencies/js-compute-runtime/js-compute-builtins.cpp#L668-L675) and to coerce the value to a String in a way which is different to other JavaScript Runtimes.

- Calling `fastly.env.get()` during initialise will work but the return value will be `undefined`, this was confusing to see as I was requesting a Fastly environment variable. I think it would be nicer for developers if calling `fastly.env.get()` during initialise will throw an error which explains why it should not be used during initialisation.
