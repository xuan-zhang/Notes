# MySQL

## 数据库操作

+ `show databases` 查看数据库
+ `create database database_name` 创建数据库
+ `use database_name` 选择数据库
+ `drop database database_name` 删除数据库
+ `show engines` 显示存储引擎
+ `set default_storage_engine=MyISAM;` 设置默认引擎
+ `show variables like 'default_storage_engine';` 查看默认引擎

## 数据类型

### 整型

+ tinyint
  + 1 字节
+ smallint
  + 2 字节
+ mediumint
  + 3 字节
+ int
  + 4 字节
  + `integer` 的简写
  + 设置长度 `int(3)` `int(6)`
  + int的长度并不影响数据的存储精度，长度只和显示有关
+ bigint
  + 8 字节

### 浮点数

+ float
  + 4 字节
+ double
  + 8 字节

### 定点数

+ `decimal(m, d) / dec(m, d)`
  + `M+2` 字节
  + 存储的是字符串， 更高的精度

### 日期与时间类型

+ year
  + 1 字节
  + 默认 `0000`
  + 年
+ date
  + 4 字节
  + 默认 `0000:00:00`
  + 日期
+ time
  + 3 字节
  + 默认 `00-00-00`
  + 时间
+ datetime
  + 8 字节
  + 默认 `0000-00-00 00:00:00`
  + 日期时间
+ timestamp
  + 4 字节
  + 默认 `00000000000000`
  + 时间戳

### 字符串(M)

+ char
  + 长度 `0 ~ 255`
  + `char(100)`
    + 固定长度 100
+ varchar
  + 长度 `0 ~ 65535`
  + varchar(100)
    + 最大长度100
    + 在最大范围内使用多少就分配多少
    + 占用空间 = 字符串长度 + 1 字节
    + varchar（20）你既可以添加20个英文字符，也可以添加二十个中文字符。 表示的字符长度

### 文本类型

+ tinytext
  + 允许长度 `0 ~ 255` 字节
  + 存储空间 = 值的长度 + 2 字节
+ text
  + 允许长度 `0 ~ 65535` 字节
  + 存储空间 = 值的长度 + 2 字节
+ mediumtext
  + 允许长度 `0 ~ 16772150`
  + 存储空间 = 值的长度 + 3 字节
+ longtext
  + 允许长度 `0 ~ 4294967295`
  + 存储空间 = 值的长度 + 4 字节

### 二进制类型

+ binary(M)
  + 字节数 M
  + 允许长度 `0 ~ M`
  + 值长度不足 `\0` 补充
  + 固定长度
+ varbinary(M)
  + 字节数 `值长度 + 1`
  + 允许长度 `0 ~ M`
  + 可变长度
+ bit(M)
  + M 位二进制 最大值 64
+ tinyblob
  + 可变长二进制数据
  + 最长 `255` 个字节
+ bolb
  + 可变长二进制数据
  + 最长 `2^16 -1` 个字节
+ mediumblob
  + 可变长二进制数据
  + 最长 `2^24 -1` 个字节
+ longblob
  + 可变长二进制数据
  + 最长 `2^32 -1` 个字节

### SET 类型

+ `属性名 set ('值1', '值2', ..., '值n')`
+ 最多 64 个元素
+ 值末尾的空格将会被系统直接删除
+ 可以取列表中的一个元素或者多个元素的组合。取多个元素时，不同元素之间用逗号隔开

### ENUM 类型

+ `属性名 ENUM('值1', '值2', ..., '值n')`
+ 最多 65535 个值
+ 列表中的每个值独有一个顺序排列的编号，MySQL中存入的是这个编号，而不是列表中的值。
+ ENUM类型加上了NOT NULL属性，其默认值为取值列表的第一个元素。如果不加NOT NULL属性，ENUM类型将允许插入NULL，而且NULL为默认值

### JSON类型

+ 值是以字符串形式写入
+ 写入时MySQL会对字符串进行解析，如果不符合JSON格式，那么写入将失败
+ JSON函数
  + `json_array()`
    + 创建JSON数组
  + `json_array_append()`
    + 追加数据
  + `json_array_insert()`
    + 插入数据
  + `_>`
    + 列路径运算符
  + `__>`
    + 增强的列路径运算符
  + `json_contains()`
    + 判断路径中是否包含某个对象
  + `json_contains_path()`
    + 判断路径中是否包含数据
  + `json_depth()`
    + json文档最大深度
  + `json_extract()`
    + 返回json文档数据
  + `json_insert()`
  + `json_keys()`
  + `json_length()`
  + `json_merge()`
  + `json_merge_preserve()`
  + `json_object()`
  + `json_pretty()`
  + `json_quote()`
  + `json_remove()`
  + `json_replace()`
  + `json_search()`
  + `json_set()`
  + `json_storage_free()`
  + `json_storage_size()`
  + `json_table()`
  + `json_type()`
  + `json_unquote()`
  + `json_valid()`

### spatial数据类型

+ 空间数据
