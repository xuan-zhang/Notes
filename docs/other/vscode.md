# VS Code 配置

## 软件配置项

```json5
{
    "workbench.iconTheme": "material-icon-theme",
    "workbench.startupEditor": "welcomePage",
    "files.autoSave": "onFocusChange",
    "liveServer.settings.donotShowInfoMsg": true,
    "files.exclude": {
        "**/.idea": true
    },
    "editor.fontFamily": "'JetBrains Mono', 'JetBrains Mono NL', 'Fira Code', Menlo, Monaco, 'Courier New', monospace",
    "editor.fontWeight": "500",
    "editor.fontLigatures": true,
    "editor.fontSize": 14,
    "todo-tree.highlights.enabled": true,
    "todo-tree.highlights.customHighlight": {
        "TODO": {
            "background": "yellow",
            "foreground": "#333",
            "rulerColour": "yellow",
            "iconColour": "yellow",
        },
        "FIXME": {
            "background": "#ffa500",
            "foreground": "#fff",
            "iconColour": "orange",
        },
        "BUG": {
            "background": "red",
            "foreground": "white",
            "type": "line",
            "iconColour": "red"
        }
    },
    "git.autofetch": true,
    "editor.suggestSelection": "first",
    "todo-tree.tree.showScanModeButton": false,
    "git.enableSmartCommit": true,
    "[javascript]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "python.jediEnabled": false,
    "python.dataScience.askForKernelRestart": false,
    "workbench.colorTheme": "One Dark Pro",
    "liveServer.settings.host": "127.0.0.1",
    "[html]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "diffEditor.ignoreTrimWhitespace": false,
    "[jsonc]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "[typescript]": {
        "editor.defaultFormatter": "denoland.vscode-deno"
    },
    "deno.enable": false,
    "[typescriptreact]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "javascript.updateImportsOnFileMove.enabled": "never",
    "editor.minimap.enabled": false,
    "python.languageServer": "Microsoft",
    "editor.renameOnType": true,
    "gitlens.gitCommands.skipConfirmations": [
        "fetch:command",
        "stash-push:command",
        "switch:command",
        "tag-create:command"
    ],
}
```

## 常用插件

### 主题

+ Atom One Dark Theme
+ Atom One Light Theme
+ Material Theme
+ One Dark Pro

+ Beautify
+ Bracket Pair Colorizer
+ EditorConfig for VS Code
+ markdownlint
+ Chinese Language
+ Path Intellisense
+ Live Server
+ SVG Viewer
+ ~~TODO Highlight~~
+ TODO Tree
+ VIM
+ Visual Studio IntelliCode
+ koroFileHeader
+ file-size

+ GitLens
+ ~~Git History~~

+ HTML CSS Support
+ HTML Snippets
+ CSS Peek
+ Auto Close Tag
+ Auto Rename Tag
+ Vetur
+ Debugger for Chrome
+ Debugger for Microsoft Edge
+ Deno
+ ~~Autoprefixer~~
+ ~~JavaScript(ES6) code snippets~~
+ ~~ESLint~~
+ ~~TSLint~~

## 代码字体

+ [cascadia-code](https://github.com/microsoft/cascadia-code/releases)
+ [FiraCode](https://github.com/tonsky/FiraCode)
+ [JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)

## 调试模式

> [官网](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)

### 配置项

+ version : 你定义这个配置文件的版本，生成的时候默认是0.2.0
+ configuration：配置域
+ name：配置文件的名字，可以自己起
+ type：调试的类型，node是vscode本身就支持，其他就需要下载插件了
+ request : 配置文件的请求类型，有launch和attach两种，launch是需要服务器的需要配置url，这里我就用的它，attach就比较麻烦了，因为配置launch也能用，所以我就没有配置attach了
+ url:这个是chrome插件带的，指定访问的链接，到这里我觉得就个缺点了，url只能配置死链接，就算用预定义变量也不能做到多项目自动识别要打开的HTML，可能是我没有发现其他的预定义变量，如果有大神知道，欢迎在评论里留言
+ webRoot：也是chrome插件带的，指定根目录或者执行文件
+ ${workspaceRoot}:就是你打开vscode读取的项目目录
+ sourceMaps:默认是启用的，对于打包的调试，大神们就必须开启了
+ userDataDir：临时目录,专门保存调试过程产生的东西，这个字段是为了重新
打开一个浏览器窗口，不会强制关闭已经打开的浏览器

### 变量

+ `${workspaceRoot}`：VSCode中打开文件夹的路径
+ `${workspaceRootFolderName}`：VSCode中打开文件夹的路径(文件夹名), 但不包含"/"
+ `${workspaceFolder}`: VS Code 中打开的文件夹目录 （通常是项目的位置）
+ `${workspaceFolderBasename}`: 没有任何斜杠 (/)的 VS Code 中打开的文件夹目录
+ `${relativeFile}`：当前打开的文件位置,相对于workspaceRoot
+ `${file}`：当前打开的文件
+ `${fileBasename}`：当前打开文件的文件名
+ `${fileBasenameNoExtension}`: 目前打开文件的除去拓展名的文件名（无拓展名， 如： main.cpp)
+ `${fileDirname}`：当前打开文件的目录名
+ `${fileExtname}`：当前打开文件的扩展名
+ `${cwd}`：当前启动时的工作目录
+ `${selectedText}`: 文件中目前被选择的内容
+ `${lineNumber}`: 文件中目前被选择的行数
+ `${env:PATH}`: 系统中的环境变量

