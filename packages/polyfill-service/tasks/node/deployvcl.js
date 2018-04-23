'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const serviceIds = {
	qa: process.env.FASTLY_SERVICE_ID_QA,
	prod: process.env.FASTLY_SERVICE_ID
};

const options = {
    service: argv.env || 'qa',
    vclFilePath: argv.vclPath || path.join(__dirname, '../../vcl/main.vcl'),
    vclName: argv.vclName || 'default',
    dryRun: argv.dryRun
};
options.serviceId = serviceIds[options.service];

if (!process.env.FASTLY_API_KEY || !options.serviceId) {
    throw new Error ("Missing Fastly credentials: Check environment configuration");
}
if (!fs.statSync(options.vclFilePath).isFile()) {
    throw new Error ("Missing VCL file");
}

const vclContent = fs.readFileSync(options.vclFilePath, 'UTF-8');

console.log('Pushing VCL to Fastly');

const fastly = require('fastly')(process.env.FASTLY_API_KEY, encodeURIComponent(options.serviceId));
let newVersion;

fastly.getServices()
    .then(services => {
        console.log('Loading Fastly service list');
        const service = services.find(svc => svc.id === options.serviceId);
        if (!service) throw new Error('Service not found.  Check options.service matches a valid service on Fastly that is accessible by your FASTLY_API_KEY');
        console.log('Cloning active version %s of %s', service.version, service.name);
        return fastly.cloneVersion(service.version).then(res => {
            newVersion = res.number;
            console.log("Created version %d", newVersion);
        });
    })

    .then(() => fastly.getVcl(newVersion))
    .then(vclsList => {
        console.log('Deleting existing VCLs');
        return Promise.all(vclsList.map(vcl => fastly.deleteVcl(newVersion, vcl.name)));
    })

    .then(() => {
        console.log('Adding new VCL');
        return fastly.updateVcl(newVersion, {
            "name": options.vclName,
            "content": vclContent
        });
    })

    .then(() => {
        console.log('Setting the VCL as main');
        return fastly.setVclAsMain(newVersion, options.vclName);
    })

    // Validate the VCL
    .then(() => fastly.validateVersion(newVersion))

    // Activate the new version
    .then((res) => {
        if (res.status === 'ok') {
            console.log('Version %s looks OK', newVersion);
            return options.dryRun ? null : fastly.activateVersion(newVersion);
        } else {
            throw new Error('VCL is invalid: ' + res.msg);
        }
    })

    .then(function(result) {
        if (result) {
            console.log('New version %s installed and activated', newVersion);
        } else {
            console.log('Dry run complete');
        }
    })

    .catch(err => {
        console.log(err);
        process.exit(1);
    })
;
