# Contributing to polyfill.io

♥ [polyfill.io](https://polyfill.io/) and want to get involved?
Thanks! There are plenty of ways you can help!

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

## Dependencies

This project requires [Node.js](https://nodejs.org/)

## Getting started

```shell
$ git clone https://github.com/Financial-Times/polyfill-service.git
$ cd polyfill-service
$ npm ci
$ npm run build # build the assets for the website
$ npm start # start a server on localhost:8080
```

## Submitting a Pull Request

Good pull requests, such as patches, improvements, and new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

Please **ask first** if somebody else is already working on this or the core developers think your feature is in-scope. Generally always have a related issue with discussions for whatever you are including.

Please also provide a **test plan**, i.e. specify how you verified that your addition works.

**IMPORTANT**: By submitting a patch, you agree to allow the project
owners to license your work under the terms of the [MIT License](../LICENSE.md).

## Updating polyfill-library

1. Open a terminal to the root folder of the repository and ensure that the latest version of master is checked out. `git checkout master && git pull origin master`
2. Create a new branch to make changes into. `git checkout -b [name]`
3. In `package.json` rename the `polyfill-library` dependency to `polyfill-library-$version` and change the version to be an npm alias. E.G. `"polyfill-library": "^3.27.4"` becomes `"polyfill-library-3.27.4": "npm:polyfill-library@3.27.4"`
4. In `server/routes/v3/polyfill.js` add a new case statement for the version of `polyfill-library` you have just added.
5. In the terminal run `npm install polyfill-library@*`
6. In `fastly/vcl/main.vcl:114` add the new version to the if statement for setting the version query parameter.
7. Commit the file changes into git, push up the branch and open a pull-request

## Cutting a Release

Every merge to the master branch will trigger a release to [staging]. When ready to deploy to [production], follow these steps:

1. Open a terminal to the root folder of the repository and ensure that the latest version of master is checked out. `git checkout master && git pull origin master`
2. Create a new branch to make changes into. `git checkout -b [name]`
3. Follow the interactive release process. `npm version [major|minor|patch]`
4. Push the changes to GitHub and make a Pull-Request. `git push origin [name]`
5. Merge the Pull-Request. This triggers [circle-ci] to deploy the service and to publish the package to [npm].
6. Announce the release on the [@polyfillio] Twitter account.

---

_Many thanks to [create-react-app](https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md) for the inspiration with this contributing guide_

[@polyfillio]: https://twitter.com/polyfillio
[circle-ci]: https://circleci.com/gh/Financial-Times/polyfill-service
[npm]: https://www.npmjs.com/
[staging]: https://qa.polyfill.io
[production]: https://polyfill.io
