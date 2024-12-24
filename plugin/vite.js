import path from 'path'
import fs from 'fs'
import {spawn} from 'child_process'
export default function viteAnalysisPlugin(options) {
    function startServer(reportPath) {
        const port = options.port || 3000; // 默认端口号为3000，如果在配置中有指定则使用指定端口号
        const server = spawn('node', ['./plugin/viteServer.js', reportPath, port]);
        server.stdout.on('data', (data) => {
          console.log(`Server stdout: ${data}`);
        });
        server.stderr.on('data', (data) => {
          console.log(`Server stderr: ${data}`);
        });
      }
  return {
      name: 'vite-analysis-plugin',
      // 在这里定义各个钩子函数来实现分析功能
      buildStart() {
          // 构建开始时的操作，可用于初始化一些数据结构等
      },
      generateBundle(options, bundle) {
          // 在这里获取Vite打包结果并进行分析，类似之前在Webpack中获取打包结果统计信息的操作
          const compilationStats = analyzeBundle(bundle);

          // 分析依赖关系
          const dependencies = analyzeDependencies(compilationStats.modules);
          // 生成可视化报告数据
          const visualReportData = {
              assets: compilationStats.assets,
              chunks: compilationStats.chunks,
              dependencies: dependencies
          };
          // 将可视化报告数据保存为一个JSON文件或进行其他处理
          const reportPath = path.join(options.dir, 'vite-analysis-report.json');
          fs.writeFileSync(reportPath, JSON.stringify(visualReportData, null, 2));
          console.log('Vite analysis report generated successfully!');
          startServer(reportPath)
      }
  };
}

function analyzeBundle(bundle) {
  // 这里实现具体分析Vite打包结果的逻辑，类似于之前分析Webpack打包结果的方式，但要根据Vite打包结果的数据结构进行调整
  const assets = [];
  const chunks = [];
  const modules = [];
  for (const [fileName, fileInfo] of Object.entries(bundle)) {
      if (fileInfo.type === 'asset') {
          assets.push({
              name: fileName,
              size: Buffer.from(fileInfo.source).length
          });
      } else if (fileInfo.type === 'chunk') {
          chunks.push({
              name: fileName,
              size: Buffer.from(fileInfo.code).length
          });
          if (fileInfo.modules) {
              modules.push(fileInfo.modules);
          }
      }
  }

  return {
      assets: assets,
      chunks: chunks,
      modules: modules
  };
}

function analyzeDependencies(modules) {
  const dependencies = {};
  modules.forEach((module) => {
      if (module.dependencies) {
          module.dependencies.forEach((dependency) => {
              const depModule = modules.find((m) => m.identifier === dependency.module);
              if (depModule) {
                  if (!dependencies[module.identifier]) {
                      dependencies[module.identifier] = [];
                  }
                  dependencies[module.identifier].push(depModule.identity);
              }
          });
      }
  });
  return dependencies;
}
