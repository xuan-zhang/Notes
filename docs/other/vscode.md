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

+ GitLens
+ ~~Git History~~

+ HTML CSS Support
+ HTML Snippets
+ Vetur
+ Denugger for Chrome
+ ~~Autoprefixer~~
+ ~~JavaScript(ES6) code snippets~~
+ ~~ESLint~~
+ ~~TSLint~~