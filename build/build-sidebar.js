const fs = require('fs');
const path = require('path');
const docsPath = path.join(__dirname, '../docs');
const outputPath = path.join(__dirname, '../docs/.vuepress/config/sidebar-auto.js');

const filesList = [];
const excludeDir = ['.vuepress', 'assets', 'README.md'];
try {
    fs.readdirSync(docsPath).forEach(fileName => {
        const fileData = {
            path: '/' + fileName + '/',
            title: fileName,
            children: [],
            hasIndex: false,
        };
        if (!excludeDir.includes(fileName)) {
            const file = path.resolve(docsPath, fileName);
            fs.readdirSync(file).forEach(fName => {
                const {name, ext} = path.parse(fName);
                if (name === 'index' && ext === '.md') {
                    fileData.hasIndex = true;
                } else if (ext === '.md') {
                    fileData.children.push(name);
                }
            });
            filesList.push(fileData);
        }
    });
} catch (e) {
    console.log('目录读取失败');
}
const obj = {};
filesList.forEach(item => {
    obj[item.path] = [{
        title: item.title,
        children: item.hasIndex ? ['', ...item.children] : item.children,
    }]
});

const str = 'module.exports = ' + JSON.stringify(obj, null, 2);
try {
    fs.writeFileSync(outputPath, str);
} catch (e) {
   console.log('文件写入失败');
}
console.log('sidebar 构建完成');