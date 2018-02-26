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
