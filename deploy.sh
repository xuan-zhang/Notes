#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成侧边栏
yarn run genSidebar

# 设置 base
echo "module.exports = '/Notes/';" > docs/.vuepress/config/base.js

# 生成静态文件
yarn run docs:build

# 还原base
echo "module.exports = '/';" > docs/.vuepress/config/base.js

# 进入生成的文件夹
cp README.md docs/.vuepress/dist
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f  https://github.com/xuan-zhang/Notes.git master:gh-pages

cd -
yarn run docs:build
cp README.md docs/.vuepress/dist
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f  https://gitee.com/xuan-zhang/xuan-zhang.git master:master

cd -
rm -rf docs/.vuepress/dist

