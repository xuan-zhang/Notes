# 待整理内容

## 代码片段

+ 文件获取路径:
    ```js
    let resUrl = res.result.url;
          let u = '';
          try{

            if(String.prototype.toLowerCase.call(typeof resUrl) === "string"){
              var s = resUrl.indexOf('/');
              var e = resUrl.indexOf('\"',s);
              if (e === -1){
                e = resUrl.length;
              }
              u = resUrl.substring(s,e);
            }

            if(String.prototype.toLowerCase.call(typeof resUrl) === "object"){
              u = response.result.url.filePath;
            }

          }catch(e){
            u = "null";
          }

          this.fileList[0].url = u;
    ```