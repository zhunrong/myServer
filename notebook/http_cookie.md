# HTTP Cookie

HTTP是无状态的，也就是说服务端不知道某次请求的另一端是谁。  
为了解决这个问题，在http请求中通过cookie来记录用户的状态。  
服务端通过响应头`Set-Cookie`向客户端传递一个cookie,相当于一个可以证明用户身份的凭证。浏览器通常可以保存cookie一段时间，在这期间浏览器向服务器请求时，通过请求头`Cookie`携带cookie信息一起发送至服务端。通过对cookie的解析，服务端可以达到识别用户的目的。

## Cookie的有效期

可以通过`Expires`字段指定一个cookie的过期时间，获取通过`Max-Age`指定cookie的有效期

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

## Cookie的`Secure`和`httpOnly`

标记为 `Secure` 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端。  
为避免跨域脚本 (XSS) 攻击，通过JavaScript的 Document.cookie API无法访问带有 `HttpOnly` 标记的Cookie，它们只应该发送给服务端。如果包含服务端 Session 信息的 Cookie 不想被客户端 JavaScript 脚本调用，那么就应该为其设置 `HttpOnly` 标记。

## Cookie的作用域

`Domain` 标识指定了哪些主机可以接受Cookie。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了Domain，则一般包含子域名。  
例如，如果设置 Domain=mozilla.org，则Cookie也包含在子域名中（如developer.mozilla.org）。  
`Path` 标识指定了主机下的哪些路径可以接受Cookie（该URL路径必须存在于请求URL中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。

## Cookie的`SameSite`(实验性)

SameSite Cookie允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。但目前SameSite Cookie还处于实验阶段，并不是所有浏览器都支持。

## `withCredentials`

一个跨域的请求，如果xhr.withCredentials=false,那么服务端返回的cookie将不会保存在浏览器上。  
Note: 不同域下的XmlHttpRequest 响应，不论其Access-Control- header 设置什么值，都无法为它自身站点设置cookie值，除非它在请求之前将withCredentials 设为true。
