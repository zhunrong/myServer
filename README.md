# node练习项目

## 练习日志

1. 2018/01/03
- 安装express，搭建hello world程序。
- express返回的host是"::",但是通过"localhost"或"127.0.01"访问有效。
- 使用static静态资源托管，访问webPage/index.html返回纯文本内容，严重不符预期。

2. 2018/01/04
- 修正昨天最后一条记录，不是纯文本，是正常的html文件，符合预期。

3. 2018/02/23
- 安装mysql node驱动包；
- 尝试查询、插入操作；
- 插入sql语句中，值要用引号包裹，否则会报错。

4. 2018/02/26
- 多个条件查询时，使用 AND 操作符连接多个条件(SQL: `SELECT * FROM students WHERE name='小红' AND age='20'`)。
- 动态生成sql查询语句，实现自动化多条件查询。
- 增删改查sql基本操作都实践了一遍。

5. 2018/02/28
- 使用中间件--multer实现文件的上传；
- 设置静态资源目录时，如果没有设置访问路由，则访问时应该省略资源目录，否则访问失败404；
- 使用a标签的download属性实现文件下载功能，href指向文件地址，download用作文件名。
- 使用formData上传多个文件时，需要遍历files然后依次append,使用同一个键名
   ```javascript
   var files = $('#file')[0].files;
   var formData = new FormData();
            
   formData.append('emoji', files[0]);
   formData.append('emoji', files[1]);
   ```
- 使用fs模块读取目录文件

6. 2018/03/01
- 实现mysql分页查询;
- 开启多条sql语句执行
   ```javascript
   mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        multipleStatements: true//设置为true
   })
   ```

7. 2018/03/02
- 完成基本h5增、删、查、改、翻页交互；

8. 2018/03/04
- 使用socket.io搭建一个websocket服务

9. 2018/03/05
- 将websocket服务器代码拆分；
- 使用socket.io提供的自定义消息发送、接收消息以及广播功能；
