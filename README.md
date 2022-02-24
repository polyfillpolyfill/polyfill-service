# polyfill.io VCL ported to JavaScript

This is a near direct port of <https://github.com/Financial-Times/polyfill-service/tree/master/fastly/vcl>.
You can view the deployed version at <https://polyfill-service.edgecompute.app/>

To run this project:
- Clone the repository and change into the repository directory
- Run `npm ci`
- Run `npm run dev`
- Visit `http://127.0.0.1:7676/` in your browser

## Deploying

To deploy this project to production:

- Clone the repository and change into the repository directory
- Run `npm ci`
- Run `npm test` and confirm all the tests pass before proceeding any further
- Run `npm run deploy` to deploy to production
