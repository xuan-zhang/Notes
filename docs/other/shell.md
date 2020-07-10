# shell 命令

> [shell教程](https://www.runoob.com/linux/linux-shell.html)
> [Bash 脚本 set 命令教程](http://www.ruanyifeng.com/blog/2017/11/bash-set.html)

## 运行

+ `sh ./start.sh`
  + `sh -x ./start.sh` 显示列输出
+ `bash ./start.sh`
+ `chmod +x ./start.sh` `./start.sh`
+ `#!` 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell

## sleep

+ sleep即延迟一段时间
+ s秒，m分，h时，d天

```bash
#!/bin/bash
echo "Hello World !"

sleep 5s
sleep 5m
sleep 5h
sleep 5d
```

## nohup

```sh

echo "--开始执行命令--"

nohup sh sleep.sh >> nohup.out &

echo "命令结束"
exit
```

## demo

```bash
deno run --allow-all $0

#!/usr/bin/env sh
set -x -u -e

D=$(pwd | grep -c "/deno-server")

echo $0

set -e

if [ $D -gt 0 ]
then
  # 在 deno-server 下用 ./start.sh 执行命令
  # deno run --allow-all ./app.ts
  echo 'hello'
else
  # deno run --allow-all ./deno-server/app.ts
  echo 'deno'
fi
```
