# nodeJS 与 mongoDB 笔记

## 目录

- [mongoDB的安装与启动](#mongodb的安装与启动)
- [mac下mongodb的安装与启动](#mac下mongodb的安装与启动)
- [mongoDB语法](#mongodb语法)
- [nodeJS安装与启动](#nodejs安装与启动)

### mongoDB的安装与启动

1. 下载 `mongoDB` 安装包并安装
2. 下载 mongoDB 可视化管理工具：`RoboMongo`
3. 配置环境变量
4. 新建数据库目录文件

    ```text
        + C:\mongodata
            + db
            + log
                mongod.log
            mongod.cfg
    ```

5. 数据库初始化, 运行 MongoDB 服务器 `$ mongod --dbpath=C:\mongodata\db`
6. 创建配置文件 `mongod.cfg`

    ```text
    systemLog:
        destination file
        path: c:\mongodata\log\mongod.log
    storage:
        dbPath: c:\mongodata\db
    ```

7. 安装 mongoDB 服务 **要以管理员命令运行** `$ mongod --config "c:\mongodata\mongod.cfg" --serviceName MongoDB --install`
8. 配置成功后启动方式:

    ```bash
    net start MongoDB # 启动服务
    net stop MongoDB # 停止服务
    mongod --remove # 移除服务
    ```

9. 使用 mongoDB:  在命令行状态下执行 `$ mongo`, 启动mongo，执行命令即可
10. Webstrom 中配置 MongoDB
    - 安装 mongodb 插件 `mongo plugin`
    - 添加 `mongo shell` : `C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe`
    - 添加 `servers`, 命名与设置连接数据库

11. 停止 mongoDB : `> use admin  > db.shutdownServer()`

------

### mac下mongodb的安装与启动

- 下载 `mongodb` 安装包 [官网](https://www.mongodb.com/download-center?jmp=nav#community)  下载`社区版`即可
- 将下载的压缩包进行解压，将文件移动到 `sudo mv ~/Desktop/mongodb-osx-x86_64-3.6.3  /usr/local/mongodb`;
- 配置环境变量

    ```bash
    cd ~
    vim .bash_profile
    # 添加以下内容
        # mongodb path
        export MONGO_PATH=/usr/local/mongodb
        export PATH=$PATH:/usr/local/mongodb/bin
        :wq
        source .bash_profile
    ```

- 查看安装情况 `$ mongod --version`
- 创建数据库目录 直接运行 `mongod` 会提示找不到数据库目录

    ```bash
    # 创建数据库安装目录
    $ cd ~
    $ mkdir -p ./data/db
    $ mongod --dbpath=~/data/db

    # 新建命令窗口，进行命令
    $ mongo
    $ db
    $ show dbs

    # 关闭后再次进入
    $ mongod --dbpath=./zxx/data/db
    ```

- 配置--日志与配置文件 `mongod --help` 或 [配置文件参数](http://www.mongodb.org.cn/manual/188.html)

    ```bash
    $ cd ~/zxx/data
    # 创建日志文件   如果数据库不在当前目录，在系统目录 `/usr/local/` 目录下，要为数据库日志文件添加操作权限
    $ mkdir log
    $ touch mongod.log

    # 创建配置文件
    $ mkdir etc
    $ touch mongod.conf

    # 配置文件如下文

    # 启动 -f 参数后是 配置文件 的路径
    $ mongod -f /etc/mongod.conf

    ```

- mongodb 关闭

    ```bash
    # 方式一 db.shutdownServer()   在 mongo shell 下 进行
    > usr admin
    > db.shutdownServer()

    # 方式二  命令行模式下 -- 无用
    $ mongod -f /etc/mongod.conf --shutdown

    # 方式三 kill
    $ ps aux | grep mongod
    $ kill -2
    ```

- `mongod.conf` 配置文件内容

    ```bash
    #数据库数据存放目录
    dbpath=/Users/jame/zxx/data/db

    #数据库日志存放目录
    logpath=/Users/jame/zxx/data/log/mongod.log

    #以追加的方式记录日志
    logappend = true

    #端口号 默认为27017
    #port=27017

    #以后台方式运行进程
    fork=true

    #开启用户认证
    #auth=true

    #关闭http接口，默认关闭http端口访问
    #nohttpinterface=true

    #mongodb所绑定的ip地址
    #bind_ip = 127.0.0.1

    #启用日志文件，默认启用
    journal=true

    #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
    #quiet=true
    ```

- 可视化工具 `Robo 3T` (studio 3T 收费)

### linux下mongodb 的安启动

- 安装: `sudo apt install mongodb`;
- 启动: `service mongodb start`;
- 查看是否启动成功：｀pgrep mongo -l｀;
- 关闭: `service mongodb stop`;
- 卸载：｀sudo apt-get --purge remove mongodb mongodb-clients mongodb-server｀
- 安装位置配置文件查看： `/etc/mongodb.conf`

------

### mongoDB语法

[目录](#目录)

1. `> show dbs` : 查看所有的库
2. `> db` : 显示当前数据库或集合
3. `> use portal` : 打开或创建一个 `portal` 数据库
4. `> db.dropDatabase()` : 删除当前库，要删除哪个库，先进入哪个库
5. `> db.createCollection(name,option)` : 创建集合
6. `> show collections` : 显示集合
7. `> exit`: 退出数据库
8. `> load(script_path)`: 运行JS编写的 MongoDB shell 脚本

#### 管理用户账户

1. `> show users`: 显示所有用户
2. `> db.createUser({})`: 添加用户 `user roles pwd userSource otherDBRoles` ，老版本为 `db.addUser({})`
3. `> db.removeUser('userName')`: 删除用户
4. 要为数据库创建和删除用户，先进入数据库 `use dbName` 之后再进行上述操作
5. 数据库角色：

    ```text
    read: 允许用户从数据库任何集合中读取数据
    readAnyDatabase: 同 read , 但只用于 admin 数据库，作用于所有数据库

    readWrite: 读写数据库功能, 包括 读任何集合， 插入、删除、更新文件， 创建、重命名、删除集合
    readWriteAnyDatabase:  同 readWrite ,只用于 admin 数据库

    dbAdmin: 读写数据库功能，外加 清理、修改、压缩、得到统计概要，并进行验证
    dbAdminAnyDatabase： 同上述

    clusterAdmin: 对数据库一般的管理，包含连接、集群、复制、列出数据库、创建和删除数据库

    userAdmin: 允许用户创建和修改数据库的用户账户
    userAdminAnyDatabase: 同上述
     ```

6. `createUser()`  创建用户使用字段

  ```text
  user: string 用户名
  roles: Array 用户角色
  pwd: hash or String [可选] 密码
  userSource: <database> [可选] 指向相同用户创建的另一个数据库，不能与 pwd 同时出现
  otherDBRoles: {
    <database>: [roles],
    <database>: [roles]

  } [可选] 在个用户在其它数据库中的角色， 只能在 admin 数据库中使用
  ```

#### 配置访问控制

1. 创建 **用户管理员** ：只有创建用户的权限，没有管理数据库或其他管理功能

    ```bash
    > use admin
    > db.createUser({
        user: "useradmin",
        pwd: "useradmin",
        roles: ["userAdminAnyDatabase"]
    })
    ```

2. 打开身份验证, 重新启动 MongoDB:  `$ mongodb --dbpath=C:\mongodata\db --auth`

3. 修改配置文件 mongod.cfg

    ```text
    systemLog:
        destination: file
        path: c:\mongodata\log\mongod.log
    storage:
        dbPath: c:\mongodata\db
    security:
        authorization: enabled
    net:
        port: 27017

    ```

4. 开启 mongodb 服务：

    ```bash
    # 进入方式一、 打开mongo shell
    $ mongo
    > use admin
    > db.auth("useradmin","useradmin") // 输入账户名与密码

    # 进入方式二、 打开mongo shell
    $ mongo admin --username "useradmin" --password "useradmin"

    ```

5. 创建 **数据库管理** 账户: 访问所有数据库、创建新数据库、并管理MongoDB的集群和副本的能力

    ```bash
    > use admin
    > db.createUser({
        user: "dbadmin",
        pwd: "dbadmin",
        roles: ["readWriteAnyDatabase", "dbAdminAnyDatabase", "clusterAdmin"]
    })
    ```

6. 启动方法同上

------

### nodeJS安装与启动

[目录](#目录)

1. 下载 node 安装包，并安装, 安装成功与否 `node -v` `npm -v`;
2. 安装 `cnpm` 淘宝镜像 `$ npm install -g cnpm --registry=https://registry.npm.taobao.org`
3. 不使用 `cnpm` 改用镜像文件: `npm install --registry=https://registry.npm.taobao.org` `npm config set registry https://registry.npm.taobao.org`
4. npm 指定版本下载 `npm install jquery@1.11.3 --save`
5. `npm init`: 初始化
6. nodeJs 升级：

    ```bash
        $ npm install -g n
           n stable
    ```

7. npm 升级： `$ npm -g install npm@next`

### Express 使用

- [官网](http://www.expressjs.com.cn/)
- 使用 `express-generator` 应用造成器 [教程](http://www.expressjs.com.cn/starter/generator.html)
- 使用 `express --help` 查看说明文档
