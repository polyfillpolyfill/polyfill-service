'use strict';

const fs = require('graceful-fs');
const path = require('path');
const child_process = require('child_process');
const denodeify = require('denodeify');
const writeFile = denodeify(fs.writeFile);
const readFile = denodeify(fs.readFile);

const argv = require('minimist')(process.argv.slice(2));

const task = argv._[0] || 'start';
const cmd = argv.cmd || path.join(__dirname, '../../bin/polyfill-service');
const pidFile = argv.pidFile || path.join(__dirname, '../../.service.pid');
const initOutputToken = argv.initOutputToken || "[procstatus:started]";

if (task === 'stop') {
    readPID(pidFile)
        .then(pid => pid ? kill(pid) : undefined)
    ;
} else if (task === "restart" || task === 'start') {
    readPID(pidFile)
        .then(pid => pid ? kill(pid) : undefined)
        .then(() => start(cmd))
        .then(pid => savePID(pidFile, pid))
    ;
}


function processExists(pid) {
	try {
		process.kill(pid, 0);
		return true;
	} catch (e) {}
	return false;
};

function waitUntil(fnEndOk, checkInterval = 200) {
	return new Promise(resolve => {
        const loopId = setInterval(() => {
		    if (true === fnEndOk()) {
		    	clearInterval(loopId);
			    resolve();
		    }
	    }, checkInterval);
    });
};

function readPID(pathToPidFile) {
    return readFile(pathToPidFile, 'UTF-8')
        .then(str => parseInt(str, 10))
        .catch(() => {
            console.log("Service PID file not found");
            return null;
        })
    ;
}
function kill(pid) {
    console.log("Killing existing process with PID=" + pid);
    try {
        process.kill(pid);
    } catch (_error) {
        console.log("Process " + pid + " was not runing");
        return Promise.resolve();
    }
    return waitUntil(() => !processExists(pid)).then(() => {
        console.log("Killed process " + pid);
    });
}

function savePID(pathToPidFile, pid) {
    writeFile(pathToPidFile, pid)
        .then(() => console.log("PID saved to " + pathToPidFile))
    ;
}

function start(command) {

    let buffer = "";
    let hasStarted = false;
    let shell;
    let args;
    const spawnOptions = { stdio: 'pipe', cwd: path.join(__dirname, '../../') };

    if (process.platform === "win32") {
        args = ["/s", "/c", command.replace(/\//g, "\\")];
        shell = "cmd.exe ";
        spawnOptions.windowsVerbatimArguments = true;
    } else {
        shell = "/bin/sh";
        args = ["-c", command];
    }
    const proc = child_process.spawn(shell, args, spawnOptions);

    console.log("Starting service with " + command);

    if (proc.stdout) {
        proc.stdout.on('data', function(d) {
            process.stdout.write(d);
            if (!hasStarted) {
                buffer += d.toString();
                if (buffer.indexOf(initOutputToken) >= 0) {
                    console.log('Successful startup detected');
                    hasStarted = true;
                }
            }

        });
    }
    if (proc.stderr) {
        proc.stderr.on('data', function(d) {
            return process.stderr.write(d);
        });
    }
    if (proc) {
        console.log("Service starting with PID = " + proc.pid);
        console.log("Waiting for \""+initOutputToken+"\" to appear on STDOUT...");
        proc.on('exit', function(code, signal) {
            console.log('Service process exited with code='+code+', signal='+signal);
        });
        proc.on('error', function() {
            return console.log('error', arguments);
        });
        proc.on('disconnect', function() {
            return console.log('disconnect', arguments);
        });
        return waitUntil(() => hasStarted).then(() => proc.pid);
    } else {
        throw new Error("Failed to start process");
    }
}
