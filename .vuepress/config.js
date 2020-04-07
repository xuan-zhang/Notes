const nav = require('./config/nav');
const sidebar = require('./config/sidebar');

module.exports = {
    title: '炫',
    description: '炫的个人的学习笔记',
    dest: '/dist',
    base: '/',
    head: [
        ['link', {
            rel: 'shortcut icon',
            href: '/favicon.ico'
        }],
    ],
    serviceWorker: true,
    markdown: {
        lineNumbers: true,
    },
    locales: {
        '/': {
            lang: 'zh-CN',
        }
    },
    plugins: [
        '@vuepress/back-to-top'
    ],
    themeConfig: {
        logo: '/logo.png',
        lastUpdated: '最后更新时间',
        nav,
        sidebar,
        repo: 'xuan-zhang/Notes',
        repoLabel: 'GitHub',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '在GitHub中编辑此页面！'
    }
};
