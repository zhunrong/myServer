(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{207:function(e,t,a){var n=a(208);"string"==typeof n&&(n=[[e.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};a(18)(n,s);n.locals&&(e.exports=n.locals)},208:function(e,t,a){(t=e.exports=a(17)(!1)).push([e.i,".blog-2v5Ot {\n  color: black; }\n  .blog-2v5Ot .articles {\n    list-style: none;\n    width: 70%; }\n    .blog-2v5Ot .articles li {\n      margin-bottom: 24px;\n      background: white;\n      padding: 10px;\n      border-radius: 3px;\n      display: flex; }\n      .blog-2v5Ot .articles li .main {\n        flex: 1; }\n        .blog-2v5Ot .articles li .main h2 {\n          cursor: pointer; }\n        .blog-2v5Ot .articles li .main .date {\n          font-size: 12px;\n          color: #909090;\n          letter-spacing: 1px; }\n      .blog-2v5Ot .articles li .user {\n        width: 100px;\n        position: relative;\n        display: flex;\n        align-items: center;\n        justify-content: center; }\n        .blog-2v5Ot .articles li .user .avatar {\n          width: 40px;\n          height: 40px; }\n",""]),t.locals={blog:"blog-2v5Ot"}},220:function(e,t,a){"use strict";a.r(t);var n=a(32),s=a.n(n),i=a(0),l=a.n(i),r=a(1),c=a(10),o=a(33),p=a(207),m=a.n(p),d=a(30),g=a.n(d),u=a(42);t.default=Object(r.withRouter)(class extends i.PureComponent{constructor(...e){super(...e),s()(this,"state",{articles:[],page:1,pageSize:10}),s()(this,"linkToDetail",e=>{this.props.history.push(`/article/${e}`)})}componentDidMount(){this.getAllArticles()}async getAllArticles(){const{page:e,pageSize:t}=this.state,{status:a,message:n,data:s}=await Object(o.d)(t,e);"success"===a?this.setState({articles:s}):c.message.error(n)}render(){const{articles:e}=this.state;return l.a.createElement("div",{className:m.a.blog},l.a.createElement("ul",{className:"articles"},e.map(e=>l.a.createElement("li",{key:e.id},l.a.createElement("div",{className:"main"},l.a.createElement("h2",{onClick:this.linkToDetail.bind(this,e.id)},e.title),l.a.createElement("div",{className:"footer"},l.a.createElement("span",{className:"date"},g()(e.updateTime).format("YYYY年MM月DD日")))),l.a.createElement("div",{className:"user"},l.a.createElement("div",{className:"avatar"},l.a.createElement(u.a,{src:e.avatar})))))))}})}}]);