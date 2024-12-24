const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class WebpackAnalysisPlugin {
  constructor(options) {
    // 接收配置选项，比如指定的端口号等
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.done.tap('WebpackAnalysisPlugin', (stats) => {
      // 获取打包结果的统计信息
      const compilationStats = stats.toJson({
        all: false,
        modules: true,
        chunks: true,
        assets: true
      });

      // 分析依赖关系
      const dependencies = this.analyzeDependencies(compilationStats.modules);

      // 生成可视化报告数据
      const visualReportData = {
        assets: compilationStats.assets,
        chunks: compilationStats.chunks,
        dependencies: dependencies
      };

      // 将可视化报告数据保存为一个JSON文件
      const reportPath = path.join(compiler.options.output.path, 'webpack-analysis-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(visualReportData, null, 2));

      // 启动本地服务器来展示可视化报告页面
      this.startServer(reportPath);

      console.log('Webpack analysis report generated and server started successfully!');
    });
  }

  analyzeDependencies(modules) {
    const dependencies = {};
    modules.forEach((module) => {
      if (module.dependencies) {
        module.dependencies.forEach((dependency) => {
          const depModule = modules.find((m) => m.identifier === dependency.module);
          if (depModule) {
            if (!dependencies[module.identifier]) {
              dependencies[module.identifier] = [];
            }
            dependencies[module.identifier].push(depModule.identifier);
          }
        });
      }
    });
    return dependencies;
  }

  startServer(reportPath) {
    const port = this.options.port || 3000; // 默认端口号为3000，如果在配置中有指定则使用指定端口号
    const server = spawn('node', ['./plugin/webpackSever.js', reportPath, port]);
    server.stdout.on('data', (data) => {
      console.log(`Server stdout: ${data}`);
    });
    server.stderr.on('data', (data) => {
      console.log(`Server stderr: ${data}`);
    });
  }
}

module.exports = WebpackAnalysisPlugin;