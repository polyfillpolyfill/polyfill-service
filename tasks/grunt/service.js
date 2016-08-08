'use strict';

// Based on code (c) js.seth.h@gmail.com, MIT License

const fs = require('fs');
const child_process = require('child_process');

function existProcess(pid) {
	try {
		process.kill(pid, 0);
		return true;
	} catch (e) {}
	return false;
};

function loopUntil(fnEndOk, done) {
	let loopId;
	return loopId = setInterval(function() {
		if (true === fnEndOk()) {
			clearInterval(loopId);
			return done();
		}
	}, 200);
};

module.exports = function(grunt) {
	return grunt.registerMultiTask('service', 'background service', function(task) {
		const target = this.target;
		const data = this.data;
		const done = this.async();
		const options = this.options({
			failOnError: false,
			stdio: 'pipe'
		});

		function killByPid(callback) {
			if (!fs.existsSync(data.pidFile)) {
				grunt.log.writeln("Service " + target + " - pid file not exists");
				if (data.failOnError) {
					return;
				} else {
					return callback();
				}
			}
			const pid = parseInt(fs.readFileSync(data.pidFile));
			grunt.log.writeln("Service " + target + " (pid=" + pid + ") is killing");
			try {
				process.kill(pid);
			} catch (_error) {
				grunt.log.writeln("Service " + target + " (pid=" + pid + ") does not exists.");
				return callback();
			}
			return loopUntil(function() {
				return !existProcess(pid);
			}, function() {
				grunt.log.writeln("Service " + target + " (pid=" + pid + ") is killed.");
				return callback();
			});
		}
		function start(callback) {

			let buffer = "";
			let hasStarted = false;
			let pid;
			let command;
			let args;

			const spawned = () => data.blocking ? undefined : callback();
			const closed = () => data.blocking ? callback() : undefined;

			if (data.pidFile) {
				if (fs.existsSync(data.pidFile)) {
					pid = parseInt(fs.readFileSync(data.pidFile));
					if (existProcess(pid)) {
						grunt.log.writeln("Service " + target + "(pid=" + pid + ") is still running.");
						if (data.failOnError) {
							return;
						}
						return killByPid(function() {
							return start(callback);
						});
					}
				}
			}
			command = data.command;
			if (data.shellCommand !== null) {
				const shellCommand = data.shellCommand;
				if (process.platform === "win32") {
					command = "cmd.exe";
					args = ["/s", "/c", shellCommand.replace(/\//g, "\\")];
					options.windowsVerbatimArguments = true;
				} else {
					command = "/bin/sh";
					args = ["-c", shellCommand];
				}
			} else {
				args = data.args;
			}
			const proc = child_process.spawn(command, args, options);
			grunt.log.writeln("Service " + target + " is starting.");
			if (proc.stdout) {
				proc.stdout.on('data', function(d) {
					if (!hasStarted) {
						buffer += d.toString();
						if (buffer.indexOf(" started") >= 0) {
							hasStarted = true;
						}
					}
					return grunt.log.writeln(d);
				});
			}
			if (proc.stderr) {
				proc.stderr.on('data', function(d) {
					return grunt.log.writeln(d);
				});
			}
			if (proc) {
				grunt.log.writeln("Service Child PID = " + proc.pid);
				proc.on('close', function(err, code) {
					grunt.log.writeln('Child process exited, code:', code);
					return closed();
				});
				proc.on('error', function() {
					return grunt.log.error('error', arguments);
				});
				proc.on('exit', function(err, code) {
					// Enable for debug if desired
					//return grunt.log.writeln('exit', arguments);
				});
				proc.on('close', function() {
					// Enable for debug if desired
					//return grunt.log.writeln('close', arguments);
				});
				proc.on('disconnect', function() {
					return grunt.log.writeln('disconnect', arguments);
				});
			}
			if (data.generatePID && data.pidFile) {
				grunt.log.writeln("Wrote service PID to " + data.pidFile);
				fs.writeFile(data.pidFile, proc.pid);
			}
			if (data.pidFile) {
				return loopUntil(function() {
					return fs.existsSync(data.pidFile) && hasStarted;
				}, function() {
					pid = parseInt(fs.readFileSync(data.pidFile));
					grunt.log.ok("Service " + target + "(pid=" + pid + ") is started.");
					return spawned();
				});
			} else {
				grunt.log.ok("Service " + target + " is started.");
				return spawned();
			}
		}

		if (!task) task = 'start';

		switch (task) {
			case "stop":
				return killByPid(done);
			case "restart":
				return killByPid(function() {
					return start(done);
				});
			case "start":
				return start(done);
		}
	});
};
