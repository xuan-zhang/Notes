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
    themeConfig: {
        logo: '/logo.png',
        nav: [{
                text: 'Git',
                link: '/Config/git.md'
            },
            {
                text: 'mysql',
                link: '/Config/mySQL.md'
            },
            {
                text: 'External',
                link: 'https://google.com'
            },
        ],
        sidebar: [{
                title: '工具', // 必要的
                sidebarDepth: 1, // 可选的, 默认值是 1
                children: [
                    '/Config/mySQL.md',
                ]
            },
            {
                title: 'Group 2',
                path: '/',
            }
        ]
    }
}