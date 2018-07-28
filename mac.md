# mac 系统环境配置

## 环境变量配置 // TODO:
+ 打开 `home` 下的 `.bash_profile` 文件
+ 添加变量路径
    ```
    # 语法说明  # 号是注释内容
    # export 导出路径
    # 变量(通常大写，中间有空格要用 " ") = 路径(路径内容不加 "")
    # $变量 表示变量的值
    # export PATH = $PATH ：路径1 ：路径2 ： 路径3  路径之间是并列关系，PATH 中包含这些东西
    # export PATH = $PATH: 固定写法
    
    # mongodb path
    export MONGO_PATH=/usr/local/mongodb 
    export PATH=$PATH:/usr/local/mongodb/bin
    ```

## 安装 Xcode

## Homebrew 安装
+ Homebrew 是 macOS 系统软件包管理器
+ [官网](https://brew.sh/index_zh-cn.html)
+ 安装命令：`$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
+ 安装信息查看： `$ brew -v` 或 `$: brew`
+ 安装位置查看： `$ which brew`

## git 安装与管理
+ 下载安装包，双击安装即可
+ [官网](https://git-scm.com/)
+ `Homebrew` 安装 
  ```
  // 安装
  $ brew install git
  
  // 删除老版本
  $ sudo mv /usr/bin/git /usr/bin/git-2.7.3
  
  // 查看版本
  $ git version
  ```
+ 升级
  ```
  // 查看版本
  git version
  
  // 查看安装位置
  which git
  
  1)更新brew，使用如下命令：
     
  $ brew update
     
  2)舍弃原有的git-link,命令如下：
     
  $ brew unlink git
     
  3)更新git，使用如下命令：
     
  $ brew install git
     
  4)验证是否为最新版本git
     
  $ git version
  
  5)完成git新版本的链库
  
  $ brew link git
  
  ```

## node 安装与管理

### nvm 安装
+ `nvm` : `node` 的包管理工具
+ [官网](https://github.com/creationix/nvm)
+ 安装命令 `$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
+ 配置环境变量
  ```
  // 进入家目录
  $ cd ~
  
  // 编辑 .bash_profile 文件，没有就创建一个
  $ vi ~./.bash_profile
  $ vi .bash_profile
  
  // 粘贴 上部代码提示路径 退出
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  
  // 重新启动命令行工具
  
  // 查看是否成功 成功显示 Node Version Manager
  $ nvm
  ```
### 安装 node
+ `nvm ls-remote` 显示所有可安装版本号
+ `nvm install stable` 安装最新稳定版本 node 
+ `nvm install v8.11.1` 安装 8.11.1 版本
+ `nvm use v9.10.1` 使用 9.10.1 版本
+ `nvm current` 显示当前使用的版本
+ `nvm ls` 显示当前系统安装的版本
+ `nvm alias default v8.11.1`  设置默认版本为 8.11.1

### npm 安装与管理
+ `npm -g install npm@5.8.0` 安装 `npm` 5.8 版本
+ `npm install npm@latest -g ` 安装最新版本
+ `npm view npm versions` 查看所有 npm 版本
+ `npm install -g cnpm --registry=https://registry.npm.taobao.org` 安装 `cnpm` 淘宝镜像 

## rvm 安装
+ `RVM` 是一个命令行工具，可以提供一个便捷的多版本 `Ruby` 环境的管理和切换。
+ [官网](https://rvm.io/)
+ 安装命令： 
  ```
  $ \curl -sSL https://get.rvm.io | bash -s stable
  $ source ~/.bashrc
  $ source ~/.bash_profile
  ```
+ 列出 `ruby` 已知版本 `$ rvm list known`
+ 安装一个 `ruby` 版本 `$ rvm install 2.4 --disable-binary`
+ 切换 `ruby` 版本 `$ rvm use 2.4`
+ 查看 `ruby` 版本 `$ ruby -v`
+ 设置 `ruby` 默认版本 `$ rvm use 2.4 --default `
+ 查看已安装的 `ruby` 版本 `$ rvm list`
+ 卸载一个已安装的版本 `$ rvm remove 1.8.7`

## sass 安装
+ [官网](https://www.sass.hk/install/)
+ 安装 `ruby`
+ `gem` 源控制
  ```
  //1.删除原gem源
  gem sources --remove https://rubygems.org/

  //2.添加国内淘宝源
  gem sources -a https://ruby.taobao.org/

  //3.打印是否替换成功
  gem sources -l

  //4.更换成功后打印如下
  *** CURRENT SOURCES ***
  https://ruby.taobao.org/
  ```
+ `sass compass` 安装
  ```
  //安装如下(如mac安装遇到权限问题需加 sudo gem install sass)
  gem install sass
  gem install compass
  ```
+ 安装完成后版本查看
  ```
  sass -v
  compass -v
  ```
+ `sass` 版本更新
  ```
  //更新sass
  gem update sass

  //查看sass版本
  sass -v

  //查看sass帮助
  sass -h
  ```
  
## iterm 安装
+ `iterm` macox上的命令行工具
+ [官网](http://www.iterm2.com/)
  
## oh-my-zsh  命令行安装与配置
+ 一个 zsh 工具
+ [官网](http://ohmyz.sh/)
+ 安装 `$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`
+ 配置环境变量 
  ```
  $ cd ~
  $ vi .zshrc
  // 在文件末尾添加
  source ~/.bash_profile
  ```
  
## tree 命令行安装与使用
+ `$ brew install tree`
+ `$ tree -a` : 显示所有文件和目录
+ `$ tree -C` : 显示所有文件和目录，并添加颜色
+ `$ tree -d` : 只显示目录，不显示文件
+ `$ tree -D` : 列出文件和目录的更改时间
+ `$ tree -f` : 显示所有文件和目录，并显示全路径名
+ `$ tree -p` : 显示权限信息
+ `$ tree -s` : 显示所有文件和目录的大小
+ `$ tree -t` : 显示文件和目录，并以时间排序

## linux `.desktop` 文件配置
+ [网站](https://www.ibm.com/developerworks/cn/linux/l-cn-dtef/index.html)
+ 放置目录： `/usr/share/applications/` `/opt/gnome/share/applications/ `
+ 配置文件
```
    [Desktop Entry]
    Encoding=UTF-8 #编码
    Version=8.0 #版本
    Name=图标显示名称
    GenericName=描述
    Comment=鼠标经过上面时的提示名称
    Exec=执行文件路径 %f %F %u %U # Type 为 Application 时使用
    Url=http://www.asdfjl****** # Type 为 Link 时使用
    Icon=图标路径
    Terminal=false #是否要使用终端
    Type=Application #启动器类型 Link  或 Application
    Categories=Application;Programme; #菜单所属类别，可以确定该菜单的位置
```

+ `Exec` 参数
```
    %f：单个文件名，即使选择了多个文件。如果已选择的文件不在本地文件系统中（比如说在HTTP或者FTP上），这个文件将被作为一个临时文件复制到本地，％f将指向本地临时文件；
    %F：文件列表。用于程序可以同时打开多个本地文件。每个文件以分割段的方式传递给执行程序。
    %u：单个URL。本地文件以文件URL或文件路径的方式传递。
    %U：URL列表。每个URL以分割段的方式传递给执行程序。本地文件以文件URL或文件路径的方式传递。
```
+