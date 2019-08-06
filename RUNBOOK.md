# Polyfill service

This is a microservice for web developers who wish to build websites with polyfills to cater for older browsers that may not have the latest technologies on which their CSS and JavaScript code depend. Normally, developers would search the web for a suitable polyfill, and then either include it in their code or link to it. This service removes the need for both of these by delivering the polyfill code directly to the browser with a one-line integration into the HTML source of the page.

## Service Tier

Silver

## Lifecycle Stage

Production

## Primary URL

http://polyfill.io

## Host Platform

Heroku

## Contains Personal Data

no

## Contains Sensitive Data

no

## Delivered By

origami-team

## Supported By

origami-team

## Known About By

* chee.rabbits
* jake.champion
* rowan.manning

## Dependencies

* ft-fastly

## Healthchecks

* polyfill.io-https

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

## More Information

<table width=100% style="border:1px solid;">
                                                                                <tr>
                                                                                <td><b>Hours of Support</b></td>
                                                                                <td>Engineering support is available in Business hours.</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Hardware</b></td>
                                                                                <td>Heroku</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Network</b></td>
                                                                                <td>Requires HTTP and HTTPS inbound</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Operating System</b></td>
                                                                                <td>Unix-like (Heroku)</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Database</b></td>
                                                                                <td>None (the service does not store any data)</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Backups</b></td>
                                                                                <td>None (the service does not store any data)</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Technical Dependencies</b></td>
                                                                                <td>NodeJS &gt;= 0.10.13</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Link to Architecture Diagram</b></td>
                                                                                <td><a href='https://docs.google.com/a/ft.com/drawings/d/1eA_sYaSRkvOqIxdkN6LRpyHeOzv8Mxr51WMfXM1sS3Q/edit?usp=sharing'>On Google Drive</a></td>
                                                                                </tr>
                                                                                
                                                                                
                                                                                <tr>
                                                                                <td><b>Link to Business Continuity Plan</b></td>
                                                                                <td>None</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Agreed Maintenance Window(s)</b></td>
                                                                                <td>None</td>
                                                                                </tr>
                                                                                
                                                                                <tr>
                                                                                <td><b>Useful Sites/Other Information</b></td>
                                                                                <td>Full information on setting up and deploying the service is in the <a rel='nofollow' href='https://github.com/Financial-Times/polyfill-service'>README in the git repo</a>, which is publicly accessible on GitHub.<br/>
                                                                                Control of the service is via the <a rel='nofollow' href='https://app.fastly.com/#analytics/4E1GeTez3EFH3cnwfyMAog'>Fastly dashboard</a> and <a rel='nofollow' href='https://dashboard-next.heroku.com/orgs/financial-times/apps/ft-polyfill-service/activity'>Heroku dashboard</a>, so check that you can access both of these.</td>
                                                                                </tr>
                                                                                </table>

## First Line Troubleshooting

There's not loads you can try before contacting the Origami team. One option is to check Heroku dyno memory usage and CPU, and restart the dynos if these are high.

## Second Line Troubleshooting

If the application is failing entirely, you'll need to check a couple of things:

1. Did a deployment just happen? If so, roll it back to bring the service back up (hopefully)
2. Check the Heroku metrics page for both EU and US apps, to see what CPU and memory usage is like ([pipeline here](https://dashboard.heroku.com/pipelines/748923ac-b3c0-4289-a0ac-c26b5a7dbe3a))
2. Check the Splunk logs (see the monitoring section of this runbook for the link)

If only a few things aren't working, the Splunk logs (see monitoring) are the best place to start debugging. Always roll back a deploy if one happened just before the thing stopped working – this gives you the chance to debug in the relative calm of QA or local.

## Monitoring

The development team does not receive monitoring alerts, but we have set up a number of standard application monitoring tools, and are available during business hours to help diagnose and resolve faults.
                                                                                
<table width="100%" style="margin: 0px; font-family: &quot;Open Sans&quot;, sans-serif; font-size: 13px; border: 1px solid black; background-color: white;"><tbody><tr><th style="background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-top: 1px solid rgb(204, 204, 204);">Tool</th><th style="background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-top: 1px solid rgb(204, 204, 204);">Dashboard</th><th style="background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-top: 1px solid rgb(204, 204, 204);">Notes</th></tr><tr><td style="vertical-align: top;">Health check</td><td style="vertical-align: top;"><a href="http://www.google.com/url?q=http%3A%2F%2Fcdn.polyfill.io%2F__health&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNFhMAo9ghRrTPZaB_3TYMBeaYJA2g" rel="nofollow" style="color: rgb(158, 47, 80) !important;">http://cdn.polyfill.io/__health</a></td><td style="vertical-align: top;">Self-diagnostics page with guidance on fixing common problems. Check this first.&nbsp;</td></tr><tr><td style="vertical-align: top;">Good to go</td><td style="vertical-align: top;"><a href="http://www.google.com/url?q=http%3A%2F%2Fcdn.polyfill.io%2F__gtg&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNGaVIRR4ov8HisbznItAxgs-1EoGQ" rel="nofollow" style="color: rgb(158, 47, 80) !important;">http://cdn.polyfill.io/__gtg</a></td><td style="vertical-align: top;"></td></tr><tr><td style="vertical-align: top;">Pingdom</td><td style="vertical-align: top;">A number of checks are available that begin 'Origami polyfill service', eg&nbsp;<a href="https://www.google.com/url?q=https%3A%2F%2Fmy.pingdom.com%2Freports%2Fuptime%23daterange%3D7days%26check%3D1338405%26tab%3Duptime_tab&amp;sa=D&amp;sntz=1&amp;usg=AFQjCNGZeL6XGzYmptihkRd7ykVASmc21A" style="color: rgb(158, 47, 80) !important;">this one</a></td><td style="vertical-align: top;"><span style="font-size: 13.3333px;">Control of the service is via the&nbsp;</span><a href="https://www.google.com/url?q=https%3A%2F%2Fapp.fastly.com%2F%23analytics%2F4E1GeTez3EFH3cnwfyMAog&amp;sa=D&amp;sntz=1&amp;usg=AFrqEzckqsCHomy3Cugwfbpm1-ind_CD4g" style="font-size: 13.3333px; color: rgb(158, 47, 80) !important;">Fastly dashboard</a><span style="font-size: 13.3333px;">&nbsp;and&nbsp;</span><a href="https://www.google.com/url?q=https%3A%2F%2Fdashboard-next.heroku.com%2Forgs%2Ffinancial-times%2Fapps%2Fft-polyfill-service%2Factivity&amp;sa=D&amp;sntz=1&amp;usg=AFrqEze3MmHbQj2j00oCqjMuKNhERp1Y3g" style="font-size: 13.3333px; color: rgb(158, 47, 80) !important;">Heroku dashboard</a><span style="font-size: 13.3333px;">, so check that you can access both of these.</span></td></tr></tbody></table>

## Failover Details

Our Fastly config automatically routes requests between the production EU and US Heroku applications. If one of those regions is down, Fastly will route all requests to the other region.

## Data Recovery Details

There is no data to recover.

## Release Details

The application is deployed to QA whenever a new commit is pushed to the `master` branch of this repo on GitHub. To release to production, the QA application must be [manually promoted through the Heroku interface](https://dashboard.heroku.com/pipelines/10cf6498-6c61-4321-b758-26728d3cffc7).

## Key Management Details

Not Applicable

