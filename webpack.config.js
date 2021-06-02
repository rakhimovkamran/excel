const path = require("path");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);
const JSLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
        },
    ];

    if (isDev) {
        loaders.push("eslint-loader");
    }

    return loaders;
};

module.exports = {
    target: "web",
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
    },

    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@core": path.resolve(__dirname, "src/core"),
        },
    },

    devtool: isDev ? "source-map" : false,
    devServer: {
        port: 3000,
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "index.html",
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: "dist",
                },
            ],
        }),
        new MiniCSSExtractPlugin({
            filename: filename("css"),
        }),
        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: JSLoaders(),
            },
        ],
    },
};
