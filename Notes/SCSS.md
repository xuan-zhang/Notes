# 目录
   - [compass配置](#compass)
   - [autoprefixer配置](#autoprefixer)

# SCSS
## 编译方式
```css
compact 
 /*命令行内容*/
sass style.scss:style.css --style compact

/*编译过后样式*/
.box { width: 300px; height: 400px; }
.box-title { height: 30px; line-height: 30px; }

compressed
/*命令行内容*/
sass style.scss:style.css --style compressed

/*编译过后样式*/
.box{width:300px;height:400px}.box-title{height:30px;line-height:30px}

expanded
/*命令行内容*/
sass style.scss:style.css --style expanded

/*编译过后样式*/
.box {
  width: 300px;
  height: 400px;
}
.box-title {
  height: 30px;
  line-height: 30px;
}


nested
/*命令行内容*/
sass style.scss:style.css --style nested

/*编译过后样式*/
.box {
  width: 300px;
  height: 400px; }
  .box-title {
    height: 30px;
    line-height: 30px; }
```

## 公共样式
```css
@charset "UTF-8";
// 兼容属性处理
@mixin box {
  *{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
}
@mixin radius($radius...) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

@mixin rotate($rotate...) {
  -webkit-transform: rotate($rotate);
  -moz-transform: rotate($rotate);
  -ms-transform: rotate($rotate);
  -o-transform: rotate($rotate);
  transform: rotate($rotate);
}

@mixin transition($trans...) {
  -webkit-transition: $trans;
  -moz-transition: $trans;
  -ms-transition: $trans;
  -o-transition: $trans;
  transition: $trans;
}

@mixin transform($trans...) {
  -webkit-transform: $trans;
  -moz-transform: $trans;
  -ms-transform: $trans;
  -o-transform: $trans;
  transform: $trans;
}

@mixin boxshadow($box) {
  -webkit-box-shadow: $box;
  -moz-box-shadow: $box;
  box-shadow: $box;
}
// rem px 单位转换
$fontSize: 22 !default;

// 双倍屏
@function rr($px) {
  @return $px/2/$fontSize+rem;
}

@function r($px) {
  @return $px/$fontSize+rem;
}

// em 与px 转换
@function em($spx) {
  @return $spx + em;
}
// 百分比
@function per($son){
  @return percentage($son);
}   


@mixin setPm($name,$val...) {
  $max: length($val);
  $str: "";
  @for $i from 1 through $max {
    $value: nth($val,$i)/2/$fontSize;
    $str: #{$str + $value}rem;
    @if $i<$max {
      $str: #{$str+" "};
    }
  }
  #{$name}: $str;
}


```

## compass
  一. 安装compass
  ```js
    1 - 安装ruby
      // 1. 查看版本信息
      ruby -v
    2 - 安装scss与compass
      //1.删除原gem源
      gem sources --remove https://rubygems.org/

      //2.添加国内淘宝源
      gem sources -a https://ruby.taobao.org/

      //3.打印是否替换成功
      gem sources -l

      //4.更换成功后打印如下
      *** CURRENT SOURCES ***
      https://ruby.taobao.org/

      // 5. 安装sass 与 compass
      gem install sass
      gem install compass

      // 6. 查看版本安装信息
      compass -v
      sass -v

      // 7. 更新
      gem update sass
      sass -v

      // 8. 查看sass帮助
      sass -h

      // 9. sass编译
      //单文件转换命令
      sass input.scss output.css

      //单文件监听命令
      sass --watch input.scss:output.css

      //如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
      sass --watch app/sass:public/stylesheets

      // 10. 编译风格
      //编译格式
      sass --watch input.scss:output.css --style compact

      //编译添加调试map
      sass --watch input.scss:output.css --sourcemap

      //选择编译格式并添加调试map
      sass --watch input.scss:output.css --style expanded --sourcemap

      //开启debug信息
      sass --watch input.scss:output.css --debug-info

  ```
  二. 建立compass
  ```js
    // 新建项目
    compass create <myproject>

    // 已有项目
    $ gem install compass
    $ cd <myproject>
    $ compass install compass
    $ compass init // 生成config.rb 文件
  ```
  三. 配置文件
  ```
# 同样文件引入一次 如果要多次引入在引入文件名后加'!' 如
# @import "test";
# @import "test!";

require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed: 目录文件配置
# 项目根目录
http_path = "/"
# css文件目录
css_dir = "css"
# sass文件目录
sass_dir = "css"
# 图片文件目录
images_dir = "img"
# js文件目录
javascripts_dir = "js"

# 关闭缓存, 不会在项目中生成 .sass-cache 目录
cache = false

# 在浏览器中添加 scss 调式模式
sourcemap = true

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# 配置代码输出风格
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment: 取消行注释
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
  ```

  三. 编译
  ```
    // 命令行编译
    compass compile
    // 监听
    compass watch

    // webstrom 编译
    1. 新建 fileWatch --> compass to SCSS
    2. language&frameWorke -> stylesheet -> compass 配置

    // webstorm 中添加代码提示
    添加libraries --> add File --> compass
  ```

## autoprefixer

  ```
   1. 安装 node

   2. 安装 Autoprefixer
      npm install autoprefixer -g
   3. 安装 postcss-cli
      npm install postcss-cli -g
   4. webstorm External Tools 配置
      打开webstorm->File->搜索External Tools->点击‘+’，设置Edit Tool
      Program： 找到AppData下的文件postcss.cmd
        C:\Users\Administrator\AppData\Roaming\npm\postcss.cmd
      Parameters：-u autoprefixer -o outputFile inputFile
         -u autoprefixer -o $FileDir$/$FileName$  $FileDir$/$FileName$
      Working directory：文件项目目录即可
         $FileDir$

   5 运行
     在输出文件中点击右键->autoprefixer ,即可生成新增兼容前缀的文件

  ```