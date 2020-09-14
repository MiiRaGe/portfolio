const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
  entry: path.join(process.cwd(), "src"),
  output: {
    path: path.join(process.cwd(), "dist"),
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: 'src/img/', to: 'img/'},
        {from: 'src/css/', to: 'css/'},
        {from: 'src/files/', to: 'files/'},
      ],
    }),
    new HandlebarsPlugin({
      // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
      entry: path.join(process.cwd(), "src", "*.hbs"),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), "dist", "[name].html"),
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
        projectHelpers: path.join(process.cwd(), "src", "helpers", "*.helper.js")
      },
 
      // hooks
      // getTargetFilepath: function (filepath, outputTemplate) {},
      // getPartialId: function (filePath) {}
      onBeforeSetup: function (Handlebars) {},
      onBeforeAddPartials: function (Handlebars, partialsMap) {},
      onBeforeCompile: function (Handlebars, templateContent) {},
      onBeforeRender: function (Handlebars, data, filename) {},
      onBeforeSave: function (Handlebars, resultHtml, filename) {},
      onDone: function (Handlebars, filename) {}
    })
  ]
};
