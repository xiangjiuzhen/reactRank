const path=require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
module.exports ={
    entry:"./client/client.tsx",//相对路径
    output:{
        path:path.resolve(__dirname,"dist"),//绝对路径,开发模式可以忽略
        filename:"js/main.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
      },
    module:{
        rules:[
            //loader
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$|\.tsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
            },{
                test:/\.jpg$/i,
                use:['file-loader']
            }
        
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
        //配置
        // new ESLintPlugin({
        //     context:path.resolve(__dirname,"../src")
        // }),
    ],
    devServer:{
        host:"localhost",
        port:"3001",
        open:true
    },
    mode:"development"
}