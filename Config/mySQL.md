# mySQL 数据库安装与配置

## 下载

+ [官网](https://dev.mysql.com/downloads/mysql/)
+ 选择社区版 `Download MySQL Community Server`

## 安装

+ 将下载的安装包解压到安装目录下，如：`D:\Program Files\MySQL\mysql-8.0.16-winx64`
+ 新建 `D:\Program Files\MySQL\Data` 目录，数据的存放目录
+ 在安装目录 `D:\Program Files\MySQL\mysql-8.0.16-winx64` 下新建配置文件 `my.ini` 必须就 ANSI 编码 默认的 mysql 根目录下

```bash
[mysqld]

# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=D:\Program Files\MySQL\mysql-8.0.16-winx64  # 有些电脑需要用双斜线\\
# 设置mysql数据库的数据的存放目录
datadir=D:\Program Files\MySQL\Data   # 此处同上
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=UTF8MB4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
# 配置sql_mode 不能包含 NO_AUTO_CREATE_USER
# sql_mode=NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

[mysql]
# 设置mysql客户端默认字符集
default-character-set=UTF8MB4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=UTF8MB4
```

### mac 下安装

+ 下载 dmg 格式文件直接安装

## 配置环境变量

+ 此电脑->右键属性->高级系统设置->环境变量->Path->编辑->bin目录的路径(`D:\Program Files\MySQL\mysql-8.0.16-winx64\bin`)->确定。
+ mac 下在 `.bash_profile` 和 `.zshrc` 中 添加如下代码

    ```bash
      # 添加mysql 环境变量
      export MYSQL_HOME=$HOME/Applications/mysql-8.0.17-macos10.14-x86_64
      export PATH="$MYSQL_HOME/bin:$MYSQL_HOME/support-files:$PATH"  
    ```

## 初始化数据库

+ `mysqld --defaults-file="D:\Program Files\MySQL\mysql-8.0.16-winx64\my.ini" --initialize --console`
+ 也可 `mysqld  --initialize --console`
+ 使用双引号 `"` 去除 `Program Files` 文件目录中的空格
+ 记住密码`A temporary password is generated for root@localhost: tIu5)8876` 1GMZ;mtD:Foh
+ 修改 `root` 密码: `123546`

## window 服务安装

+ 使用管理员权限打开命令行：`mysqld --install MySQL --defaults-file="D:\Program Files\MySQL\mysql-8.0.16-winx64\my.ini"`
+ 下次启动运行：`net start MySql` 
+ 停止服务：`net stop mysql`
+ 删除服务: `sc delete mysql`

## 相关操作

+ 启动: `mysqld`
+ 查看启动详情: `mysqld --console`
+ 新建命令行窗口登录操作: `mysql -u root -p`, 之后输入密码
+ 更改密码：`mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';`
+ `mysql` 命令行中执行命令后要加 `;` 后再按 `ENTER` 键才能执行代码
+ mac 使用 dmg 安装包后，须重启系统

## 重置 root 密码

+ 停止 `mysql` 服务
+ 命令 `sudo mysqld_safe --skip-grant-tables`
+ `FLUSH PRIVILEGES;`
+ `ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';`
