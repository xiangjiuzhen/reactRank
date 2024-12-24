const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();

function startServer(reportPath, port) {
  // 设置静态文件目录，用于提供前端页面相关文件的访问
  app.use(express.static(path.join(__dirname, 'public')));

  // 定义路由，当访问根路径时，读取并返回可视化报告数据的JSON文件
  app.get('/content', (req, res) => {
    fs.readFile(reportPath, 'utf8', (err, data) => {
      if (err) {
        console.log('错误')
        res.status(500).send('Error reading report data');
      } else {
        console.log(data)
        res.json(JSON.parse(data));
      }
    });
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  const { exec } = require('child_process');
  // 要打开的网页地址
  const url = `http:localhost:${port}`;
  // 根据操作系统执行不同的打开网页命令
  const command = process.platform === 'darwin'? `open ${url}` : process.platform === 'win32'? `start ${url}` : `xdg - open ${url}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令出错: ${error}`);
      return;
    }
    console.log(`已尝试打开网页: ${url}`);
  });
}

// 从命令行参数获取报告文件路径和端口号
const reportPath = process.argv[2];
const port = process.argv[3];
console.log(reportPath,port)
startServer(reportPath, port);