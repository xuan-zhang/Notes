# blob base64 与 file 格式转换

## blob file 转 base64

```js
var reader = new FileReader();
reader.readAsDataURL(blob:Blob | file:File); // file 或 blob
reader.onload = function(){
    console.log(reader.result); //获取到base64格式图片
};

```

## base64 转 file blob

```js

/**
 * base64图片 转 file
 * @param dataUrl
 * @param filename
 * @returns {File}
 */
function dataURLtoFile(dataUrl, filename) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime}); // 转 file
  return new Blob([u8arr], {type:mime}) // 转 blob
}

```

## blob 转 file

```js
const file = new File([blob], filename, {type: contentType, lastModified: Date.now()});
const file = new File([byteArrays], filename, {type: contentType, lastModified: Date.now()});
```

## file 转 blob

```js
function fileChange() {
  let e = e || window.event;
  let file = e.target.files[0];
  let reader = new FileReader();
  let rs = reader.readAsArrayBuffer(file);
  let blob = null;
  reader.onload = (e) => {
    if (typeof e.target.result === 'object') {
      blob = new Blob([e.target.result])
    } else {
      blob = e.target.result
    }
    console.log(Object.prototype.toString.call(blob));
  }
}

```

## blob 转成图片路径

```js
const img = document.createElement("img");
img.src = window.URL.createObjectURL(blob);
img.onload = function(e) {
    window.URL.revokeObjectURL(img.src);
};
document.body.appendChild(img)
```
