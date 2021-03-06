const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.join(process.cwd(), "src"),
    output: {
        path: path.join(process.cwd(), "docs"),
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(process.cwd(), 'docs'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {url: false, sourceMap: true}},
                    {
                        loader: 'less-loader',
                        options: {lessOptions: {relativeUrls: false, math: 'parens-division'}, sourceMap: true}
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {from: 'src/img/', to: 'img/'},
            ],
        }),
        new HandlebarsPlugin({
            // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
            entry: path.join(process.cwd(), "src", "*.hbs"),
            // output path and filename(s). This should lie within the webpacks output-folder
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "docs", "[name].html"),
            // you can als add a [path] variable, which will emit the files with their relative path, like
            // output: path.join(process.cwd(), "build", [path], "[name].html"),

            // or add it as filepath to rebuild data on change using webpack-dev-server
            data: path.join(__dirname, "src/data/project.json"),

            // globbed path to partials, where folder/filename is unique
            partials: [
                path.join(process.cwd(), "src", "components", "*", "*.hbs")
            ],

            // register custom helpers. May be either a function or a glob-pattern
            helpers: {
                nameOfHbsHelper: Function.prototype,
                projectHelpers: path.join(process.cwd(), "src", "helpers", "**", "*.helper.js")
            },

            // hooks
            // getTargetFilepath: function (filepath, outputTemplate) {},
            // getPartialId: function (filePath) {}
            onBeforeSetup: function (Handlebars) {
            },
            onBeforeAddPartials: function (Handlebars, partialsMap) {
            },
            onBeforeCompile: function (Handlebars, templateContent) {
            },
            onBeforeRender: function (Handlebars, data, filename) {
            },
            onBeforeSave: function (Handlebars, resultHtml, filename) {
            },
            onDone: function (Handlebars, filename) {
            }
        })
    ]
};
