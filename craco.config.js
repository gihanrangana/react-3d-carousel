const CSS_MODULE_LOCAL_IDENT_NAME = process.env.REACT_APP_ENV === "production" ? "_[hash:base64:5]" : "[local]_[hash:base64:5]";
const {ESLINT_MODES} = require('@craco/craco');
const path = require("path");
const fs = require("fs");

module.exports = function ({env}) {
    return {
        eslint: {
            mode: ESLINT_MODES.file,
        },
        webpack: {
            configure: (webpackConfig, {env, paths}) => {

                const nodePath = `${paths.appNodeModules}${path.sep}`;

                webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {

                    let tsString = "file.ts";

                    if (rule.include && typeof rule.test === "object" && tsString.search(rule.test)) rule.include = [rule.include, nodePath];

                    if (rule.oneOf) {

                        rule.oneOf = rule.oneOf.map(one => {

                            if (one.include && typeof one.test === "object" && tsString.search(one.test)) one.include = [one.include, nodePath];

                            return one;

                        });

                    }

                    return rule;

                });

                return webpackConfig;

            }
        },
        style: {
            modules: {
                camelCase: true,
                localIdentName: CSS_MODULE_LOCAL_IDENT_NAME
            },
            sass: {
                loaderOptions: (sassLoaderOptions, {env, paths}) => {

                    let prepend = "";

                    if (fs.existsSync(process.cwd() + "/src/styles/Global.scss")) {

                        prepend += fs.readFileSync(process.cwd() + "/src/styles/Global.scss");

                    }

                    sassLoaderOptions.prependData = prepend;

                    return sassLoaderOptions;

                }
            }
        },
        babel: {
            loaderOptions: {
                // Without this Babel caches module name resolution,
                // e.g. wrongly identifies that CSS module does not exist.
                cacheDirectory: false,
            },
            plugins: [
                ["babel-plugin-react-css-modules", {
                    filetypes: {
                        ".scss": {
                            syntax: "postcss-scss",
                            // plugins: [
                            //     "postcss-nested"
                            // ]
                        }
                    },
                    generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,
                    handleMissingStyleName: 'warn',
                    autoResolveMultipleImports: true,
                    attributeNames: {
                        activeStyleName: "activeClassName"
                    }
                }]
            ]
        },
    };
}