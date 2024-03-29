# git 使用

## 配置

+ 对本机授权

    ```bash
    # 生成 ssh 为 ~/.ssh/id_rsa.pub
    ssh-keygen -t rsa -C "your_email@youremail.com"

    ## 将 里面内容复制到个人账号
    ```

+ `git clone --depth=1 https://github.com/*****` :  克隆时只克隆最近的文件，避免 `.git` 文件过大时克隆过慢；
+ 全局配置

    ``` bash
    git config --global user.name "your name" 　# 配置用户名与密码
    git config --global user.email "your eml"

    # 记住密码
    git config --global credential.helper store # 不用每次输入密码 长期
    git config --global credential.helper cache # 十五分钟
    git config credential.helper 'cache --timeout=3600' # 自定义时间 单位 s

    # 查看密码
    cd ~
    vim .git-credentials  # 账号密码存在此文件中 可以直接修改，但要删除 钥匙串 中存储的密码
    ```

+ `HEAD` : 当前版本； `HEAD^`: 上一个版本; `HEAD^^`： 上上个版本； `HEAD~100`：上100个版本
+ 工作区 -- 暂存区 -- 版本库
+ 已跟踪 -- 未跟踪
+ 未修改 -- 已修改 -- 已存入暂存区

## 工作流

+ ![git工作流](../assets/images/gitstream.jpg)
+ git 常用命令 ![git命令](../assets/images/git.jpg)
+ ![远程操作](../assets/images/pullfeatch.png)

## 常用命令与工作流

### 新建

```bash
git init # 新建
# 状态查看
git status
git show
```

### 获取

```bash
# fetch
git fetch -p
git fetch origin # 取回所有
git fetch origin master # 取回 master 分支

# 获取远程分支到本地，如果本地没有 就新建一个
git fetch origin branchname:branchname

# pull = fetch + merge
git pull <远程主机名> <远程分支名>:<本地分支名>
# 当前在 master 分支下
git pull == git fetch origin + git merge origin/master
# 当前在 dev 分支下
git pull == git fetch origin + git merge origin/dev  
# 如果有多个 remote 指定 remote
git pull origin next:master # 取回origin主机的next分支，与本地的master分支合并
git pull origin next #远程分支是与当前分支合并
git pull --all # 拉取所有分支

git pull --allow-unrelated-histories # 获取提交历史
```

#### pull 配置

```bash
# 新增
git config pull.rebase false  # 合并（缺省策略）
git config pull.rebase true   # 变基
git config pull.ff only       # 仅快进

# 使用变基拉取代码

git config --global  pull.rebase false

```

+ 结果： `cat ~/.gitconfig`

```diff
[credential]
 helper = store
[core]
 autocrlf = input
[filter "lfs"]
 clean = git-lfs clean -- %f
 smudge = git-lfs smudge -- %f
 process = git-lfs filter-process
 required = true
+ [pull]
+	 rebase = false

```

### 提交

```bash
git add .
git add a.txt # 存入暂存区
git commit -m "update" # 将暂分区
git commit -a -m "update" a.txt # 同上两步

# 推送
git push -u orgin master # 第一次
git push --set-upstream origin master # 将本地分支推送至远程 origin
git push origin master # 将本地仓库提交到远程 orgin 仓库 master 分支中
git push gitee master
git push origin dev
git push origin test:master   # 提交本地test分支作为远程的master分支
git push origin test:test     # 提交本地test分支作为远程的test分支
git push --all origin  # 提交本地所有分支到远程
git push --force origin
```

### 撤消

```bash
reset: 取消暂存
checkout：取消工作区更改

#显示提交历史
git log
git log --pretty=oneline
git commit --amend #修改最后一次提交写的注释
git checkout -- readme.txt # 撤消工作区的更改
git reset HEAD readme.txt # 撤消 git add 操作
git reflog # 命令历史
git reset --hard HEAD^ # 删除工作空间改动代码，撤销commit，撤销git add . 
git reset --hard HEAD^^
git reset --hard HEAD~100
git reset --hard 053a
git reset --soft HEAD^ # 不删除工作空间改动代码，撤销commit，不撤销git add . 
git reset --mixed HEAD^ #不删除工作空间改动代码，撤销commit，并且撤销git add . 操作

git revert <commit> #撤消指定的提交
git reset HEAD^ # 恢复到上一个版本， 只是恢复到了暂存区
git checkout -- test.txt # 将删除的test.txt 从暂存区恢复到工作区
```

#### 回滚

```bash
git checkout <tag>
git checkout v2.0
git checkout <branch_name>
git checkout dev

# 回滚到指定commitID
git checkout <commitID> <filename>

# 清空一个分支
git rm -rf .

# 清除未被跟踪的文件/目录
git clean -f
git clean -f -d
```

#### 撤销本地更改，使用远程分支强制覆盖本地

```bash
git fetch --all
git reset --hard origin/<branch_name>
git pull

# 更新单个文件或目录
git fetch
git checkout origin/<branch_name> -- path/file

```

### 删除

```bash
# 不想文件被跟踪
git rm --cached readme1.txt    删除readme1.txt的跟踪，并保留在本地。
git rm --f readme1.txt    删除readme1.txt的跟踪，并且删除本地文件。
```

#### 删除已提交的 `commit`

> 如有 commit： commitA --> commitB --> commitC  
> 要删除 commitB

```bash
# 1. 查看 commitID
git log

# 2. git rebase 之前不能有暂存内容
git add .
git commit -am <commit message>

# 3. git rebase -i <commitA_ID>
git rebase -i f46d75

# 会得到如下 文件

pick 7efc1e7 要删除的commit
pick 9477817 commit end

# 4. 将上处 pick 改为 drop
# 变基 d8bff92..9477817 到 d8bff92（2 个提交）

drop 7efc1e7 要删除的commit 
# 注意： 如果采用 drop drop掉的commit 改动信息也会删除，破坏性操作 
# fixup 与 squash 是修改合并到上一个修改，如果 commit 是连续的，将要丢弃的 commit 设置成 f | s 即可，如果 commit 不连续 此方式不可行
pick 9477817 commit end

# 命令:
# p, pick <提交> = 使用提交
# r, reword <提交> = 使用提交，但修改提交说明
# e, edit <提交> = 使用提交，进入 shell 以便进行提交修补
# s, squash <提交> = 使用提交，但融合到前一个提交
# f, fixup <提交> = 类似于 "squash"，但丢弃提交说明日志
# x, exec <命令> = 使用 shell 运行命令（此行剩余部分）
# b, break = 在此处停止（使用 'git rebase --continue' 继续变基）
# d, drop <提交> = 删除提交

# 5. 使用 ：wq 保存更改

# 6. 如有冲突处理冲突
# 7. 添加新的 commit
git commit --amend <new commit message>

# 8. 强制推送
git push --force

```

#### 合并多个 commit

+ 连续的多个 commit 合并成一个 squash: 直接使用图形界面操作或如下命令

```bash
git rebase -i <commitId> # 要合并操作的 *上一个* commitId

# 将要合并 commit 设置成 fixup 或 squash
# 将合并到的目标 commit 设置成 reword(需要修改说明) 或 pick
# :wq 保存

git rebase --continue

```

+ 不连续的 commit 合并成一个：无法使用 squash 合并，要删除原来 commit 再 cherry-pick

```bash
git checkout -b temp-branch # 新建一个临时分支，保存内容
git rebase -i <commit-id> # commit-id 为要删除的前面的 commitId

# 将要合并的分支 commit 设置成 drop

git rebase --continue

git cherry-pick <commitId> # 从 temp-banch 中选择已删除的 ID

# 这时已删除的 commit 位于分支前面 合并这几个 commit 即可
git rebase -i <commitId> # cherry-pick 之前的commit

... #步骤同合并多个连续 commit

```

### 分支

```bash
# 创建并切换到新的分支
git checkout -b newbranch
git checkout -b dev origin/dev
git branch --set-upstream-to=origin/dev dev
git branch --set-upstream master origin/next
git branch newbranch
git checkout newbranch

# 查看当前分支
git branch

# 查看远程分支
git branch -r

# 合并分支
git checkout master
git merge newbranch
git merge --no-ff -m "merge with no-ff" dev
# 删除分支
git branch -d newbranch # 删除本地分支
git branch -D newbranch # 强制删除本地分支

# 删除远程分支
git push --delete origin <branchname>
git push origin :<branchname> # 谁送空分支到远程分支，相当于删除远程分到

# 重命名分支
git branch -m oldname newname

```

### 创建一个新的空白分支

```bash
git checkout --orphan emptybranch # 新的空白分支
git rm -rf . # 原分支中的内容会自动添加, 移除原分支文件
# 新建一个文件
git add new.txt
git commit -a -m 'new text'
git merge emptybranch --allow-unrelated-histories # 新空白分支无共同父祖先，要添加 allow* 参数
git pull origin master --allow-unrelated-histories
```

### 合并与变基

> rebase commit 显示位置，不是按 commit 创建时候排列，是按 commit 提交时间排列，远程库History 列表可能出现一天前的提交，在一小时前的提交前端，这是变基造成的  
> merge 中会创建一个新的 commit 在最前面，所以使用变基要慎重

```bash
# merge
git checkout master # 当前分支变为 master
git merge dev # 把 dev 分支合并到 master 分支上
git merge a b # 把 a b 分支合并到当前分支 master 上并提交
git merge --no-commit dev

# 合并单个文件
git checkout dev public/a.js # 把 dev 分支 public 文件夹下的 a.js 合并一当前分支

# rebase
git checkout dev # 进入分支
git rebase master # 将当前分支 dev 上的更改 合并到 master 分支上
git checkout master # 回去 master 分支上
git merge dev # 将 dev 分支 合并到 当前分支上 master 上

git rebase --continue # 当有冲突时，解决冲突后继续 rebase
git rebase --abort # 中止 rebase
```

### 远程库

```bash
# 查看远程库信息
git remote
git remote -v

# 添加远程库
git remote add gitee https:#*****.git

# 移除库
git remote rm origin

# 重命名
git remote rename <原主机名> <新主机名>

# 修改远程库地址
git remote set-url origin <新地址>

```

### tag

```bash
git tag
git tag v1.0
git tag v2.0 546af
git tag -a v2.0 -m 'vetsion 2.0 release' 546af

git show v1.0

git push origin v1.0
git push origin --tags #摬所有tag

git tag -d v0.9 #删除tag
git push origin :refs/tags/v0.8 # 删除远程 tag
git push origin --delete tag v2.0

git checkout tab_name

 #从 tag 新建分支
git branch <new_branch_name> <tag_name>
git checkout -b <new_branch_name> <tag_name>
```

### 比较

```bash
# 查看工作区和版本库里面最新版本的区别
git diff HEAD -- readme.txt
```

### bug 处理

```bash
git stash # 将工作区与暂存区保存起来， 本地保存, 缓存：staged changes and unstaged changes; 不会缓存：untracked files and ignored files
git stash -u # --include-untracked
git stash -a # include untracked and ignored
git stash pop # 返回最新工作进度，栈顶暂存出栈，记录删除
git stash list # 保存进度列表
git stash pop --index
git stash pop stash@{1}
git stash apply # 栈顶暂存出栈，记录保持

git stash drop stash@{1}
git stash clear

git stash branch <branch_name> # 从stash 创建分支

```

```bash
# 一个工作流
git stash
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

# 部分合并
git pull origin <branch_name> # 拉取远程库
git reset --hard # 发现有冲突，撤销本地暂存与工作区
git checkout -b <backup_branch_name> # 备份当前
git checkout <branch_name> # 回到备份前
git reset --hard origin/<branch_name> #用远程库覆盖本地
git checkout <backup_branch_name> my_work_path/path # 从备份库中取出自己工作目录到当前分支合并
git branch -d <backup_branch_name> # 如果备份无用，可删除
```

## Commit messages的基本语法

+ 格式

    ```xml
    <type>: <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>
    ```

+ 说明： `Type` 表示提交类别，`Subject` 表示标题行， `Body` 表示主体描述内容。

    ```text
    标题行：50个字符以内，描述主要变更内容
    主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
      * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
      * 他如何解决这个问题? 具体描述解决问题的步骤
      * 是否存在副作用、风险?
    如果需要的化可以添加一个链接到issue地址或者其它文档
    ```

+ Type
  + `feat`: 添加新特性
  + `fix`: 修复bug
  + `docs`: 仅仅修改了文档
  + `style`: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  + `refactor`: 代码重构，没有加新功能或者修复bug
  + `perf`: 增加代码进行性能测试
  + `test`: 增加测试用例
  + `chore`: 改变构建流程、或者增加依赖库、工具等

## 分支构成

+ [参考连接](https:#juejin.im/post/5b4328bbf265da0fa21a6820)

   ```text
    master：与线上版本保持绝对一致；
    develop：开发分支，由下文提到的release、feature、hotfix分支合并过后的代码；
    feature：实际功能点开发分支，建议每个功能新建一个feature， 具有关联关系的功能公用一个feature分支；
    release：每一次开发完成之后，从develop创建出来的分支，以此分支为基准，进行测试；
    hotfix：该分支主要用于修复线上bug；
   ```
