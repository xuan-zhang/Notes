# JavaScript 笔记

![http缓存](../assets/images/httpCache.jpg)

## 新特性

### ?. 可选链

+ babel plugins `@babel/plugin-proposal-optional-chaining`

```js
  const a = {}
  console.log(a?.b?.c) // undefined
  console.log(a?.b.c) // Error Cannot read property 'c' of undefined"
  
  const b = 7
  console.log(b?.c?.d) // undefined

```

### ?? 非undefined 非 null

```js
 undefined ?? 'default'  // 'default'
 null ?? 'default' // 'default'
```

### :: bind call

### func(x, ?) 柯里化

### # 私有关键词
