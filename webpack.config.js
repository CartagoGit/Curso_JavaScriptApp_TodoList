const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",

	output: {
		clean: true
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
			}
		]
	},

	optimization: {},

	plugins: [
		new HtmlWebPackPlugin({
			title: "Mi Webpack App",
			template: "./src/index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			// [name].[fullhash].css', //[name]- para dejar el nombre original [fullhash] para crear un hash diferente y que no se guarde en cache
			ignoreOrder: false
		}),
		new CopyPlugin({
			patterns: [{ from: "./src/assets/", to: "assets/" }]
		})
	]
};
