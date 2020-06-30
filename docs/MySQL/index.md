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

## 数据表操作

### 设计理念

+ 标准化规范化
  + 确保每列保持原子性
  + 确保每列都和主键相关
  + 确保每列都和主键列直接相关，而不是间接相关
+ 数据驱动
+ 考虑各种变化
+ 表和表的关系
  + 一对一
  + 一对多
  + 多对多

### 字符集

> 符号与编码的集合

#### 支持引擎

+ MyISAM
+ MEMORY
+ InnoDB

#### 字符集编码表

> 字符集中的字符集合

+ 字符串表达式的编码表属性
  + ASCII
    + 表达式只能包含Unicode码从`U+0000`到`U+007F`
    + UNICODE的子集
    + ASCII字符编码可以被无损地转化为任何UNICODE编码或者其他ASCII的父集
  + UNICODE
    + 表达式包含Unicode码从`U+0000`到`U+10FFFF`
+ 特点
  + 字符串的编码表取决于字符串内容，有可能与字符集的编码表不同
  + 含有一个字符串参数的函数继承参数的编码表
  + 返回字符串但没有字符串参数，并且使用 `character_set_connection` 变量设置的函数，其编码表为 `character_set_connection` 设置的编码表
  + 含有两个及以上字符串参数的函数使用“最宽的”参数编码表作为编码表。如果在两个参数中，一个为ASCII字符集，另一个为UNICODE字符集，那么函数的编码表为UNICODE
+ 在语句中可使用 `CHARACTER SET` 指定字符集

#### 元数据

+ 关于数据的数据
+ 与数据库内容相对的其他任何描述数据库的内容都是元数据
+ 列名、数据库名、版本名、用户名以及大部分show语句展示的结果都是元数据
+ 特点
  + 所有的元数据必须为同一个字符集，否则在 `INFORMATION_SCHEMA` 中SHOW语句或 `SELECY` 语句无法正常运行
  + 元数据必须包含所有语言所用到的所有字符，否则使用者无法使用自己的语言命名列和表
  + MySQL使用UNICODE字符集存储数据，命名为 `UTF-8`

#### 查看字符集

+ `SHOW VARIABLES LIKE 'character_set_system';`
+ `SHOW CHARACTER SET;`
+ 如果想要服务器以不同的字符集传递元数据结果，使用 `SET NAMES` 语句强制服务器完成字符集转换

#### 错误消息字符集

### 排序

#### 规则的集合

+ 对于字符集和排序有4个层面的默认设置：服务器、数据库、表和列

#### `SHOW COLLATION;`

+ 查看排序
+ 后缀"_cs"或者"_ci"意思是区分大小写和不区分大小写（Case Sensitive & Case Insensitve）

#### 排序命名约定

+ 排序名称以字符集开头，以一个或多个后缀标明其他特性
+ 指定语言的排序包括本地编码或语言名称
+ 排序后缀指明这个排序是否区分大小写或重音
+ 对Unicode字符集，排序名称可能包含版本号数字来指明对应的Unicode排序算法（UCA）的版本号。如果不包含版本号，就默认使用版本4.0.0。

#### 服务器字符集和排序

+ MySQL服务器的字符集和排序可在服务器启动时通过命令或在配置文件中设置，在运行时可以修改。
+ 服务器字符集和排序取决于你启动mysqld时使用的配置项，可以使用++character+set+server设置，在这个命令之后可以加上++collation+server设置排序。如果不指定字符集，默认为utf8mb4。
+ 如果只指定字符集，不指定排序，就使用字符集对应的默认排序

#### 数据库字符集和排序

+ 数据库包含自己的字符集和排序
+ CREATE DATABASE和ALTERDATABASE语句都可使用选项指定数据库的字符集和排序
+ MySQL数据库字符集和排序规则
  + 创建时，同时指定字符集和排序，使用指定的字符集和排序
  + 只指定字符集，不指定排序，使用字符集对应的默认排序
  + 只指定排序，使用排序对应的字符集
  + 字符集与排序都不指定，选择服务器的字符集和排序

#### 表字符集和排序

+ 每张表都有字符集和排序
+ 规则
  + 如果同时指定字符集和排序，就使用指定的字符集和排序
  + 如果只指定字符集，不指定排序，就使用字符集对应的默认排序
  + 如果只指定排序，就使用排序对应的字符集
  + 如果两者都不指定，就使用数据库的字符集和排序

#### 列字符集和排序

#### 字符串的字符集和排序

#### 连接字符集和排序规则

#### 配置应用程序字符集和排序

### 命令

+ `create table tablename()`
+ `describe/desc tablename`
+ `drop table tablename`
+ `alert table user rename  user_info;`
+ `alert table tablename add propName propType first/after pNameOld;`
+ `alert table tablename drop propName;`

### 约束

+ not  null
+ default
+ unique
  + 在设计表中的索引中配置
+ primary
+ auto_increment
+ foreign key
