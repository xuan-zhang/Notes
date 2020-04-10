# Python

+ [官网英文](https://www.python.org/)
+ [手册](https://docs.python.org/zh-cn/3.7/)
+ [Python代码执行过程](http://www.pythontutor.com/visualize.html#mode=edit)

## 环境搭建

## [anacida3](https://www.anaconda.com/distribution/)

### pip

+ [官网](https://pip.pypa.io/en/stable/)
+ 通用的 Python 包管理工具，是easy_install的替代品
+ 安装 python3 时自带 pip;

#### 使用

+ `python3 -m pip --version`
+ `pip3 --version`
+ 安装包：`pip install SomePackage`

  ```bash
    $ pip install SomePackage            # latest version
    $ pip install SomePackage==1.0.4     # specific version
    $ pip install 'SomePackage>=1.0.4'     # minimum version
    $ pip freeze > requirements.txt
    $ pip install -r requirements.txt
    $ pip install --user --upgrade SomePackage
  ```

+ 显示包：`pip show`
  + 显示包信息：`pip show SomePackage`
  + 显示安装包：`pip show --files SomePackage`
+ 列出包：`pip list`
  + 列出过期包： `pip list --outdated`
+ 搜索包：`pip search "query"`
+ 升级包：`pip install --upgrade SomePackage`
+ 卸载包：`pip uninstall SomePackage`

### Pypi

+ [python官方的第三方库的仓库](https://pypi.org/help/)
+ [pypi 镜像](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)
