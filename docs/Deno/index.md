# Deno

## 环境变量

```text
DENO_DIR             Set deno's base directory (linux defaults to $HOME/.cache/deno, mac $HOME/Library/Caches/deno/, windows $HOME/AppData/Local/deno)
DENO_INSTALL_ROOT    Set deno install's output directory (defaults to $HOME/.deno/bin)
NO_COLOR             Set to disable color
HTTP_PROXY           Proxy address for HTTP requests (module downloads, fetch)
HTTPS_PROXY          Same but for HTTPS
```

+ 将 DENO_DIR 配置到环境变量
  + `echo 'export DENO_DIR=$HOME/.deno' >> ~/.bash_profile`

## API

+ `Deno.pid` 当前正在运行的进程 ID
+ `Deno.noColor`: 显示环境变量 `NO_COLOR` 的值

## 调试

+ vscode

```json5
{
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Debug Deno (Allow All)",
        "cwd":"${workspaceFolder}",
        "runtimeExecutable": "deno",
        "runtimeArgs": ["run", "--inspect-brk", "-A", "${workspaceFolder}/deno-server/app.ts"],
        "port": 9229 // 必需要有此项 port when attaching to a running process
      },
    ]
}

```
