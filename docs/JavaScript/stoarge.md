# localStorage sessionStorage 封装

```js
// 本地存储和获取的方法
function getStorage(storage) {
  return {
    getItem: storage.getItem.bind(storage),
    setItem: storage.setItem.bind(storage),
    removeItem: storage.removeItem.bind(storage),
    clear: storage.clear.bind(storage),
    key: storage.key.bind(storage),
    length: storage.length,
    get(item) {
      const result = storage.getItem(item)
      let res
      try {
        // @ts-ignore
        res = JSON.parse(result)
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.warn(e)
        res = result
      }
      return res
    },
    set(name, item) {
      let setItem
      try {
        setItem = JSON.stringify(item)
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.warn(e)
        setItem = item
      }
      storage.setItem(name, setItem)
    },
    remove(name) {
      if (name !== undefined) {
        storage.removeItem(name)
      } else {
        storage.clear()
      }
    },
  }
}

export const localStorage = getStorage(window.localStorage)
export const sessionStorage = getStorage(window.sessionStorage)

```
