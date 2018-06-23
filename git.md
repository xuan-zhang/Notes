# git 使用

+ `git clone --depth=1 https://github.com/*****` :  克隆时只克隆最近的文件，避免 `.git` 文件过大时克隆过慢；
+ 全局配置
    ```
    git config --global user.name "your name" 　// 配置用户名与密码
    git config --global user.email "your eml"

    git config --global credential.helper store // 不用每次输入密码
    ```

+  常用命令
   ```
      git init // 新建
      // 每次新建、修改后
      git add a.txt // 存入暂存区
      git commit -m "update" // 将暂存区提交到分区

      // 显示所有修改提交信息
      git log
      git log --pretty=oneline

      // 版本回退
      git reset --hard HEAD^
      git reset --hard HEAD^^
      git reset --hard HEAD~100
      git reset --hard 053a
      git reset HEAD readme.txt // 将暂存区修改更改撤消

   // 更改记录
      git reflog

      // 状态查看
      git status

      // 查看工作区和版本库里面最新版本的区别
      git diff HEAD -- readme.txt
     ```