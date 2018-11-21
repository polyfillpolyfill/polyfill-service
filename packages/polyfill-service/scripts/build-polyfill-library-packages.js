"use strict";

const execa = require("execa");
const fetch = require("make-fetch-happen");
const denodeify = require("denodeify");
const fs = require("fs-extra");
const path = require("path");
const ssri = require("ssri");
const tar = require("tar");
const globby = require("globby");
const mkdirp = require("mkdirp");
const brotliCompress = denodeify(require("iltorb").compress);
const rimraf = denodeify(require("rimraf"));
const hasha = require("hasha");

const npmPackageHashesPath = path.join(__dirname, "npm-package-hashes.json");
const npmPackageHashes = fs.readJsonSync(npmPackageHashesPath);

const prebuiltLibraryHashesPath = path.join(__dirname, "prebuilt-library-hashes.json");
const prebuiltLibraryHashes = fs.readJsonSync(prebuiltLibraryHashesPath);

const libraryLocation = path.join(__dirname, "../polyfill-library-packages");
async function libraryAlreadyExists(version) {
	const filePath = path.join(libraryLocation, `./${version}.tar.br`);
	const exists = fs.existsSync(filePath);
	if (exists) {
		const hash = await hasha.fromFile(filePath, { algorithm: "sha512" });
		return hash === prebuiltLibraryHashes[version];
	} else {
		return false;
	}
}

let packageInfo;
const main = async function() {
	try {
		const nameAndVersions = JSON.parse(await execa.stdout("npm", ["view", "polyfill-service@3", "version", "--json"])).map(version => `polyfill-service@${version}`);

		for (const nameAndVersion of nameAndVersions) {
			const version = nameAndVersion.replace("polyfill-service@", "");
			if (!(await libraryAlreadyExists(version))) {
				const filePath = path.join(libraryLocation, `./${nameAndVersion}.tgz`);
				packageInfo = JSON.parse(await execa.stdout("npm", ["view", nameAndVersion, "dist", "--json"]));
				if (!npmPackageHashes[nameAndVersion] && packageInfo.integrity) {
					npmPackageHashes[nameAndVersion] = packageInfo.integrity;
					fs.outputJsonSync(npmPackageHashesPath, npmPackageHashes, {
						spaces: 2
					});
				}
				const opts = {
					integrity: npmPackageHashes[nameAndVersion] || packageInfo.integrity || "sha512-oops"
				};

				const exists = fs.existsSync(filePath);
				if (exists) {
					const file = fs.readFileSync(filePath);
					ssri.checkData(file, opts.integrity, { error: true });
					console.log(`Already downloaded ${nameAndVersion}`);
				} else {
					await fetch(packageInfo.tarball, opts)
						.then(res => res.buffer())
						.then(buf => fs.writeFileSync(filePath, buf));
					console.log(`Downloaded ${nameAndVersion}`);
				}

				const dir = path.join(libraryLocation, nameAndVersion);
				fs.ensureDirSync(dir);

				await tar
					.extract({
						file: filePath,
						cwd: dir,
						strip: 1
					})
					.then(() => rimraf(filePath));

				await execa.stdout("npm", ["i"], {
					cwd: dir
				});
				console.log(`Installed dependencies for ${nameAndVersion}`);

				const oldPaths = await globby([`${nameAndVersion}/polyfills/__dist/*.json`], { cwd: libraryLocation });

				for (const old of oldPaths) {
					const config = JSON.parse(fs.readFileSync(path.join(libraryLocation, old), "utf8"));

					const minSource = config.minSource;
					const rawSource = config.rawSource;

					const meta = Object.assign({}, config, {
						rawSource: null,
						minSource: null
					});
					delete meta.rawSource;
					delete meta.minSource;

					const temp = old.split("/");
					const fileName = temp[temp.length - 1].replace(".json", "");
					const fileDirectory = path.join(
						libraryLocation,
						temp
							.slice(0, 1)
							.join("/")
							.replace("polyfill-service@", "") +
							"/" +
							fileName
					);
					const minPath = path.join(fileDirectory, `/min.js`);
					const rawPath = path.join(fileDirectory, `/raw.js`);
					const metaPath = path.join(fileDirectory, `/meta.json`);
					mkdirp.sync(fileDirectory);
					fs.writeFileSync(minPath, minSource, "utf8");
					fs.writeFileSync(rawPath, rawSource, "utf8");
					fs.writeFileSync(metaPath, JSON.stringify(meta), "utf8");
				}

				const aliasesPaths = await globby([`${nameAndVersion}/polyfills/__dist/aliases.json`], { cwd: libraryLocation });
				for (const aliases of aliasesPaths) {
					const file = fs.readFileSync(path.join(libraryLocation, aliases), "utf8");
					const temp = aliases.split("/");
					const fileDirectory = path.join(
						libraryLocation,
						temp
							.slice(0, 1)
							.join("/")
							.replace("polyfill-service@", "")
					);
					const filePath = path.join(fileDirectory, `aliases.json`);

					mkdirp.sync(fileDirectory);
					fs.writeFileSync(filePath, file, "utf8");
				}

				const metaPaths = await globby([`${nameAndVersion}/polyfills/__dist/**/meta.json`], { cwd: libraryLocation });
				for (const meta of metaPaths) {
					const file = fs.readFileSync(path.join(libraryLocation, meta), "utf8");
					const temp = meta.split("/");
					const fileName = temp[temp.length - 2].replace(".json", "");
					const fileDirectory = path.join(
						libraryLocation,
						temp
							.slice(0, 1)
							.join("/")
							.replace("polyfill-service@", "") +
							"/" +
							fileName
					);
					const filePath = path.join(fileDirectory, `/meta.json`);
					mkdirp.sync(fileDirectory);
					fs.writeFileSync(filePath, file, "utf8");
				}

				const minPaths = await globby([`${nameAndVersion}/polyfills/__dist/**/min.js`], { cwd: libraryLocation });
				for (const min of minPaths) {
					const file = fs.readFileSync(path.join(libraryLocation, min), "utf8");
					const temp = min.split("/");
					const fileName = temp[temp.length - 2].replace(".json", "");
					const fileDirectory = path.join(
						libraryLocation,
						temp
							.slice(0, 1)
							.join("/")
							.replace("polyfill-service@", "") +
							"/" +
							fileName
					);
					const filePath = path.join(fileDirectory, `/min.js`);
					mkdirp.sync(fileDirectory);
					fs.writeFileSync(filePath, file, "utf8");
				}

				const rawPaths = await globby([`${nameAndVersion}/polyfills/__dist/**/raw.js`], { cwd: libraryLocation });
				for (const raw of rawPaths) {
					const file = fs.readFileSync(path.join(libraryLocation, raw), "utf8");
					const temp = raw.split("/");
					const fileName = temp[temp.length - 2].replace(".json", "");
					const fileDirectory = path.join(
						libraryLocation,
						temp
							.slice(0, 1)
							.join("/")
							.replace("polyfill-service@", "") +
							"/" +
							fileName
					);
					const filePath = path.join(fileDirectory, `/raw.js`);
					mkdirp.sync(fileDirectory);
					fs.writeFileSync(filePath, file, "utf8");
				}

				const pkgPaths = await globby([`${nameAndVersion}`], { cwd: libraryLocation, onlyDirectories: true });
				for (const pkg of pkgPaths) {
					await rimraf(pkg);
				}

				const file = path.join(libraryLocation, `${version}.tar`);
				await tar.c(
					{
						gzip: false,
						file: file,
						cwd: libraryLocation
					},
					[version]
				);

				const compressedFile = await brotliCompress(fs.readFileSync(file), {
					quality: 11
				});

				fs.writeFileSync(`${file}.br`, compressedFile);
				console.log(`Removing ${version}`);
				await rimraf(path.join(libraryLocation, version));
				console.log(`Removing ${file}`);
				await rimraf(file);
				console.log(`Removing ${nameAndVersion}`);
				await rimraf(path.join(libraryLocation, nameAndVersion));

				const hash = await hasha.fromFile(`${file}.br`, { algorithm: "sha512" });
				prebuiltLibraryHashes[version] = hash;
				fs.outputJsonSync(prebuiltLibraryHashesPath, prebuiltLibraryHashes, {
					spaces: 2
				});
			} else {
				console.log(`Already built ${nameAndVersion}`);
			}
		}
	} catch (error) {
		console.log(`Error running build-polyfill-library-packages.js: ${error}`);
	}
};

main();
