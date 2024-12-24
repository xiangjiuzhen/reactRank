window.addEventListener('load', function () {

    fetch('/content')
     .then(response => response.json())
     .then(data => {
      console.log(data)
        const assetList = document.getElementById('asset-list');
        data.assets.forEach(asset => {
          const li = document.createElement('li');
          if(asset.size > 1024 && asset.size < 1048576){
            li.textContent = `${asset.name}: ${(asset.size/1024).toFixed(2) + 'KB'}`;
          }else if(asset.size >= 1048576){
            li.textContent = `${asset.name}: ${(asset.size/1048576).toFixed(2) + 'MB'}`;
          }else{
            li.textContent = `${asset.name}: ${asset.size + 'byted'}`;
          }
          
          assetList.appendChild(li);
        });
  
        const chunkList = document.getElementById('chunk-list');
        data.chunks.forEach(chunk => {
          const li = document.createElement('li');
          li.textContent = `${chunk.name}: ${chunk.size}`;
          chunkList.appendChild(li);
        });
  
        const dependencyList = document.getElementById('dependency-list');
        for (const module in data.dependencies) {
          const li = document.createElement('li');
          li.textContent = `${module}: ${data.dependencies[module].join(', ')}`;
          dependencyList.appendChild(li);
        }
      },err=>{
        console.log('错误')
      });
  });