#!/usr/bin/env sh
# 发布到 gitee
# 确保脚本抛出遇到的错误
set -e

# 生成侧边栏
yarn run genSidebar

# 生成静态文件
yarn run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f  https://gitee.com/xuan-zhang/xuan-zhang.git master:master

cd -
rm -rf docs/.vuepress/dist
