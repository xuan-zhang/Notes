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

      // 远程
      git push -u orgin master // 第一次
      git push origin master
      git clone
     ```
+ 分支
    ```
        // 创建并切换到新的分支
        git checkout -b newbranch
        git branch newbranch
        git checkout newbranch

        // 查看当前分支
        git branch

        // 合并分支
        git checkout master
        git merge newbranch
        git merge --no-ff -m "merge with no-ff" dev
        // 删除分支
        git branch -d newbranch
        git branch -D newbranch
    ```
+ bug 处理
    ```
    git stash // 将工作区与暂存区保存起来
    git stash pop // 返回最新工作进度
    git stash list // 保存进度列表
    git stash pop --index
    git stash pop stash@{1}
    git stash apply

    git stash drop stash@{1}
    git stash clear
    ```
    ```
    git status
    git stash
    git status
    git checkout master
    git checkout -b issue-101
    vim read.txt
    git add read.txt
    git commit -m 'bug fixed'
    git checkout master
    git merge --no-ff -m 'merge bug' issue-101
    git branch -d issue-101
    git checkout dev
    git stash list
    git stash pop
    ```
+ 远程库
    ```
    // 查看远程库信息
    git remote
    git remote -v

    // 推送
    git push origin master
    git push origin dev

    // 获取分支
    git checkout -b dev origin/dev
    git push origin dev
    git pull
    git branch --set-upstream-to=origin/dev dev
    git pull
    git push origin dev
    ```
+ tag
    ```
    git tag
    git tag v1.0
    git tag v2.0 546af
    git tag -a v2.0 -m 'vetsion 2.0 release' 546af

    git show v1.0

    git tag -d v1.0.3

    git push origin v1.0
    git push origin --tags

    git tag -d v0.9
    git push origin :refs/tags/v0.8
    ```