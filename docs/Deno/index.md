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
