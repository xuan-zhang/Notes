# git 使用

+ `git clone --depth=1 https://github.com/*****` :  克隆时只克隆最近的文件，避免 `.git` 文件过大时克隆过慢；
+ 全局配置
    ```
    git config --global user.name "your name" 　// 配置用户名与密码
    git config --global user.email "your eml"

    git config --global credential.helper store // 不用每次输入密码
    ```
+ `HEAD` : 当前版本； `HEAD^`: 上一个版本; `HEAD^^`： 上上个版本； `HEAD~100`：上100个版本
+  常用命令；
   ```
      git init // 新建
      // 每次新建、修改后
      git add a.txt // 存入暂存区
      git commit -m "update" // 将暂分区

      // 显示提交历史
      git log
      git log --pretty=oneline

      // 版本回退
      git reset --hard HEAD^
      git reset --hard HEAD^^
      git reset --hard HEAD~100
      git reset --hard 053a

      // 将暂存区修改更改撤消
      git reset HEAD readme.txt // 撤消 git add 操作
      git checkout -- readme.txt // 撤消工作区的更改

      // 命令历史
      git reflog

      // 状态查看
      git status

      // 查看工作区和版本库里面最新版本的区别
      git diff HEAD -- readme.txt

      // 删除文件
      git rm file.txt

      // 远程分支
      git push -u orgin master // 第一次
      git push origin master
      git clone
     ```
+ 分支
    ```
        // 分
    ```