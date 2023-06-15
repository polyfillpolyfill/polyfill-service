<!--
	Written in the format prescribed by https://github.com/Financial-Times/runbook.md.
	Any future edits should abide by this format.
-->
# Polyfill service

This is a microservice for web developers who wish to build websites with polyfills to cater for older browsers that may not have the latest technologies on which their CSS and JavaScript code depend. Normally, developers would search the web for a suitable polyfill, and then either include it in their code or link to it. This service removes the need for both of these by delivering the polyfill code directly to the browser with a one-line integration into the HTML source of the page.

## Code

origami-polyfill-service

## Service Tier

Silver

## Lifecycle Stage

Discontinued

## Primary URL

http://polyfill.io

## Host Platform

Fastly

## Contains Personal Data

No

## Contains Sensitive Data

No

## Can Download Personal Data

No

## Can Contact Individuals

No

## Failover Architecture Type

ActiveActive

## Failover Process Type

FullyAutomated

## Failback Process Type

FullyAutomated

## Data Recovery Process Type

NotApplicable

## Release Process Type

PartiallyAutomated

## Rollback Process Type

PartiallyAutomated

## Key Management Process Type

NotApplicable

## Architecture

This system is a Node.js [application](https://github.com/Financial-Times/polyfill-service) and [library](https://github.com/Financial-Times/polyfill-library). It has no dependencies on other services to run.

## First Line Troubleshooting

There's not loads you can try before contacting the Origami team.

## Second Line Troubleshooting

If the application is failing entirely, you'll need to check a couple of things:

1.  Did a deployment just happen? If so, roll it back to bring the service back up (hopefully)
2.  Check the Fastly metrics page, to see what CPU and memory usage is like.

Always roll back a deploy if one happened just before the thing stopped working – this gives you the chance to debug in the relative calm of QA or local.

## Monitoring

The development team does not receive monitoring alerts, but we have set up a number of standard application monitoring tools, and are available during business hours to help diagnose and resolve faults.

## Data Recovery Details

There is no data to recover.

## Release Details

The application is deployed to QA whenever a new commit is pushed to the `main` branch of this repo on GitHub. To release to production, publish a GitHub release.
