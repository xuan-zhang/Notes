# 获取 `select` 选种项目

## 问题

```html
<select id="select" multiple>
  <option value="1">一</option>
  <option>二</option>
  <option value="3">三</option>
</select>
```

## `HTMLSelectElement.selectedOptions`

+ 兼容性：**IE 不支持**
+ 适用场景：单选与多选
+ 只读属性

  ```js
    const elSelect = document.getElementById("select");
    const selectedOptions = elSelect.selectedOptions;
    const selectedValues = Array.from(selectedOptions).map  (item=>item.value)); // ["1", "二", "3"]
  ```

## `HTMLSelectElement.selectedIndex`

+ 适用场景：单选，多选只显示第一个选种项目
+ 兼容性: `IE8+`
+ 没有选种项，返回 `-1`
+ 非只读属性，可以设置 `elSelect.selectedIndex = 1`，选种第二项

  ```js
    const elSelect = document.getElementById("select");
    const selectedIndex = elSelect.selectedIndex;
    const selectedValue = selectedIndex >-1 && elSelect[selectedIndex].value; // "1"
  ```

## `HTMLDataElement.value`

+ 兼容性：`IE9+`
+ 适用单选, 返回选种项的第一个
+ 可设置，更改选种项，设置 `IE` 不支持

  ```js
    const elSelect = document.getElementById("select");
    const selectedValue = elSelect.value; // "1"
  ```
