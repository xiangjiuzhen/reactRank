const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  name: "client",
  entry: {
    client: path.resolve(__dirname, "client/client.tsx"),
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname + "/dist/static"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$|\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test:/\.(jpg|png|gif|ico|otf|html)$/,
        type:"asset/resource",
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator:{ 
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename:"img/[name].[hash:6][ext]",
          //打包后对资源的引入，文件命名已经有/img了
          publicPath:"./"
        }
      }
    ],
  },
  target: "web",
  plugins: [ new WebpackManifestPlugin(),new CleanWebpackPlugin()],
};
