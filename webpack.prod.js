const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",

	output: {
		clean: true,
		filename: "main.[contenthash].js"
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				loader: "html-loader",
				options: {
					sources: false
				}
			},
			{
				test: /\.css$/,
				exclude: /styles.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /styles.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.(png|jpe?g|gif)$/,

				loader: "file-loader",
				options: {
					esModule: false,
					name: "assets/img/[name].[ext]"
				}
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	},

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
	},

	plugins: [
		new HtmlWebPackPlugin({
			title: "Mi Webpack App",
			template: "./src/index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[fullhash].css",
			// [name].[fullhash].css', //[name]- para dejar el nombre original [fullhash] para crear un hash diferente y que no se guarde en cache
			ignoreOrder: false
		}),
		new CopyPlugin({
			patterns: [{ from: "./src/assets/", to: "assets/" }]
		})
	]
};
