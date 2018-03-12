# git 命令

## 目录
  + [在webstrom中连接github](#在webstrom中连接github)
  + [在webstrom中安装配置autoprefixer](#在webstrom中安装配置autoprefixer)

-------------------

### 在webstrom中连接github
+ 设置
 1. 设置 --> Version Control --> GitHub
 2. 填入 Host: github.com  Login: 用户名  Password: 密码
 3. 点击 Test 测试是否连通  成功 success
 4. 设置 --> Version Control --> Git 
 5. 安装git  测试是否安装 成功 success
+ 对本机授权
 1. 进入目录: `cd ~/.ssh` 
 2. 生成新的ssh `$ ssh-keygen -t rsa -C "your_email@youremail.com"`  生成的ssh 在 `.ssh\id_rsa.pub` 中.
 3. 在github setting --> SSH Keys 中添加新创建的 ssh
+ 使用git
 1. VCS --> Checkout from Version Control --> gitHub

 -------------

 ### 在webstrom中安装配置autoprefixer

 + 安装
    1. 安装 `Autoprefixer` : `npm install autoprefixer -g`
    2. 安装 `postcss-cli` : `npm install postcss-cli -g`
    3. 软件配置 `Webstorm` 中的 `External Tools`:
        `Preferences -> Tools -> External Tools`
    4.