# VS Code 配置

## 软件配置项

```json5

{
  "files.autoSave": "afterDelay", // 自动保存
  "editor.wordWrap": "on",
  "workbench.startupEditor": "newUntitledFile",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "Atom One Dark",
  "liveSassCompile.settings.autoprefix": [
    "last 3 versions",
    "> 10%",
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 6",
    "ios >= 6",
    "android >= 4.4"
  ],
  "scss.lint.zeroUnits": "warning",
  "liveSassCompile.settings.formats": [
    {
      "format": "compressed",
      "extensionName": ".css",
      "savePath": null
    }
  ],
  "liveServer.settings.host": "127.0.0.1",
  "vim.handleKeys": {
    "<C-a>": false,
    "<C-c>": false,
    "<C-v>": false,
    "<C-x>": false,
    "<C-f>": false
  },
  "material-icon-theme.showUpdateMessage": false,
  "liveServer.settings.donotShowInfoMsg": true,
  "git.autofetch": true,
  "gitlens.advanced.messages": {
    "suppressFileNotUnderSourceControlWarning": true,
    "suppressShowKeyBindingsNotice": true
  },
  "git.enableSmartCommit": true,

  "files.exclude": {
    "**/.idea": true
  },
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true,
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "liveServer.settings.donotVerifyTags": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.fontFamily": "'Fira Code', Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true
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
+ TODO Highlight
+ TODO Tree
+ VIM
+ Visual Studio IntelliCode
+ koroFileHeader

+ GitLens
+ ~~Git History~~

+ HTML CSS Support
+ HTML Snippets
+ Auto Close Tag
+ Auto Rename Tag
+ Vetur
+ Denugger for Chrome
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

