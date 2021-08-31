const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: [
        "json",
        "javascript",
        "python",
        "typescript",
        "xml",
        "yaml",
        "cpp",
        "css",
        "go",
        "html",
        "ini",
        "java",
        "lua",
        "mysql",
        "markdown",
        "redis",
        "rust",
        "shell",
        "sql",
      ],
    }),
  ],
};
