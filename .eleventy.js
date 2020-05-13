"use strict";

const glob = require('fast-glob');
const path = require('path');

/**
 * The @11ty/eleventy configuration.
 * 
 * For a full list of options, see: https://www.11ty.io/docs/config/
 */
module.exports = (eleventyConfig) => {
    const dirs = {
        input: "./src/assets/",
        data: `../data/`,
        includes: `../includes/`,
        output: "./.cache_eleventy"
    }
    const files = glob.sync(path.join(process.cwd(), dirs.input, "**/*"), { ignore: ['**/node_modules/**', '.github/**'] });
    const exts = files.map(file => path.extname(file).replace('.', ''));

    // Make all files pass through to output folder
    eleventyConfig.setTemplateFormats(exts);

    return {
        pathPrefix: "/v3",

        // Set the src and output directories
        dir: dirs,

        // Set the default template engine from `liquid` to `njk`
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",

        // Set up eleventy to pass-through files to be compiled by Parcel
        passthroughFileCopy: true
    };
};
