(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{206:function(e,t,r){var a=r(207);"string"==typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(18)(a,i);a.locals&&(e.exports=a.locals)},207:function(e,t,r){(t=e.exports=r(17)(!1)).push([e.i,".userSetting-7Q_7J{background:white;padding-top:20px;padding-bottom:20px}.userSetting-7Q_7J .ant-tabs .ant-tabs-left-bar .ant-tabs-tab{text-align:left}.userSetting-7Q_7J .ant-tabs .ant-tabs-left-bar .ant-tabs-tab.ant-tabs-tab-active{background:#e6f7ff}.userSetting-7Q_7J .ant-tabs .ant-tabs-left-content{padding:0 50px}\n",""]),t.locals={setting:"userSetting-7Q_7J"}},208:function(e,t,r){var a=r(209);"string"==typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(18)(a,i);a.locals&&(e.exports=a.locals)},209:function(e,t,r){(t=e.exports=r(17)(!1)).push([e.i,".baseSetting-3Gk1A h2{font-size:20px;margin-bottom:20px}.baseSetting-3Gk1A form{display:-webkit-box;display:flex}.baseSetting-3Gk1A form .form-left{width:300px;margin-right:100px}.baseSetting-3Gk1A form .form-right{-webkit-box-flex:1;flex:1}\n",""]),t.locals={baseSetting:"baseSetting-3Gk1A"}},210:function(e,t,r){var a=r(211);"string"==typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(18)(a,i);a.locals&&(e.exports=a.locals)},211:function(e,t,r){(t=e.exports=r(17)(!1)).push([e.i,".articleList-2-gQv h2{font-size:20px;margin-bottom:20px}.articleList-2-gQv .head-title{word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;color:#333;display:block}\n",""]),t.locals={articleList:"articleList-2-gQv"}},222:function(e,t,r){"use strict";r.r(t);var a=r(30),i=r.n(a),o=r(0),n=r.n(o),s=r(1),c=r(13),l=r(206),p=r.n(l),d=r(11),h=r(208),g=r.n(h),m=r(33),u=r(41),b=r(40),f=r(43);function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){i()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}class C extends o.PureComponent{constructor(...e){super(...e),i()(this,"state",{error:!1}),i()(this,"handleUploaded",e=>{const{onChange:t}=this.props;t&&t(`http://${e.key}`)})}componentWillReceiveProps(e){const t=e["data-__field"].errors;this.setState({error:!(!t||!t.length)})}render(){const{value:e}=this.props,{error:t}=this.state,r=t?{boxShadow:"red 0px 0px 6px 1px"}:{};return n.a.createElement(b.a,{onUploaded:this.handleUploaded,uploadDir:"images/avatar",crop:{x:0,y:0,aspect:1,width:10,height:10}},n.a.createElement("div",{style:A({width:"100px",height:"100px",borderRadius:"50%"},r)},n.a.createElement(f.a,{src:e||""})))}}var w=C;class y extends o.Component{constructor(e){super(e),i()(this,"formInited",!1),i()(this,"initFormFields",e=>{const{setFieldsValue:t}=this.props.form;e&&!this.formInited&&(t({email:e.email,nickname:e.nickname,avatar:e.avatar}),this.formInited=!0)}),i()(this,"saveBaseInfo",()=>{const{validateFields:e}=this.props.form;e(async(e,t)=>{if(e)return;const{status:r,user:a,message:i}=await Object(m.i)(t.nickname,t.avatar);"success"===r?(this.props.updateUserInfo(a),d.message.success("更新成功")):d.message.error(i)})})}componentDidMount(){const{userInfo:e}=this.props;this.initFormFields(e)}componentWillReceiveProps(e){this.initFormFields(e.userInfo)}render(){const{getFieldDecorator:e}=this.props.form;return n.a.createElement("div",{className:g.a.baseSetting},n.a.createElement("h2",null,"基本设置"),n.a.createElement(d.Form,null,n.a.createElement("div",{className:"form-left"},n.a.createElement(d.Form.Item,{label:"邮箱"},e("email",{})(n.a.createElement(d.Input,{disabled:!0}))),n.a.createElement(d.Form.Item,{label:"昵称"},e("nickname",{rules:[{required:!0,message:"昵称不能为空"}]})(n.a.createElement(d.Input,null))),n.a.createElement(d.Form.Item,null,n.a.createElement(d.Button,{type:"primary",onClick:this.saveBaseInfo},"保存基本信息"))),n.a.createElement("div",{className:"form-right"},n.a.createElement(d.Form.Item,{label:"头像"},e("avatar",{rules:[{required:!0,message:"请上传头像"}]})(n.a.createElement(w,null))))))}}var v=Object(c.b)((function(e){return{userInfo:e.common.userInfo}}),(function(e){return{updateUserInfo:t=>{e(Object(u.b)(t))}}}))(d.Form.create()(y)),R=r(31),k=r(210),E=r.n(k),I=r(12);class S extends o.Component{constructor(...e){super(...e),i()(this,"state",{articles:[],page:1,pageCount:2,pageSize:5,total:0,loading:!1}),i()(this,"handleTableChange",e=>{this.setState({page:e.current},()=>{this.getArticles()})}),i()(this,"handleAction",async(e,t)=>{const{history:r}=this.props;switch(e){case"edit":Object(I.d)(t.id),r.push("/editor");break;case"delete":{const{status:e,message:r}=await Object(R.c)([t.id]);"success"===e?(d.message.success("删除成功！"),this.getArticles()):d.message.error(r);break}case"publicOrPrivate":{const{status:e,message:r}=await Object(R.d)(t.id,{public:1-t.public});"success"===e?this.getArticles():d.message.error(r);break}}})}componentDidMount(){this.getArticles()}async getArticles(){const{page:e,pageSize:t}=this.state;this.setState({loading:!0});const{status:r,meta:a,data:i,message:o}=await Object(R.g)(t,e);"success"===r?this.setState({articles:i,pageCount:a.pageCount,total:a.total,loading:!1}):d.message.warn(o)}render(){const{articles:e,page:t,pageSize:r,loading:a,total:i}=this.state,o={current:t,pageSize:r,total:i,showTotal:(e,t)=>n.a.createElement("div",null,"共",e,"篇文章")},c=[{title:"文章标题",dataIndex:"title",ellipsis:!0,width:200,render:(e,t)=>n.a.createElement(s.Link,{className:"head-title",to:`/article/${t.id}`,title:e},e)},{title:"更新时间",dataIndex:"updateTime",align:"center",width:200},{title:"操作",align:"center",render:(e,t)=>{const r=1===t.public;return n.a.createElement(d.Button.Group,null,n.a.createElement(d.Button,{size:"small",type:"default",onClick:e=>this.handleAction("publicOrPrivate",t)},r?"隐藏":"公开"),n.a.createElement(d.Button,{size:"small",type:"primary",onClick:e=>this.handleAction("edit",t)},"编辑"),n.a.createElement(d.Popconfirm,{title:"确定要删除吗？",onConfirm:e=>this.handleAction("delete",t),okText:"是",cancelText:"否",icon:n.a.createElement(d.Icon,{type:"exclamation-circle",style:{color:"red"}})},n.a.createElement(d.Button,{size:"small",type:"danger"},"删除")))}}];return n.a.createElement("div",{className:E.a.articleList},n.a.createElement("h2",null,"我的文章"),n.a.createElement("div",{className:"article-list"},n.a.createElement(d.Table,{columns:c,dataSource:e,rowKey:"id",pagination:o,onChange:this.handleTableChange,loading:a})))}}var D=Object(s.withRouter)(S);class z extends o.Component{constructor(e){super(e),i()(this,"state",{activeKey:"1"}),i()(this,"handleTabsChange",e=>{this.setState({activeKey:e})}),this.props.login||this.props.history.replace("/home")}render(){const{activeKey:e}=this.state;return n.a.createElement("div",{className:p.a.setting},n.a.createElement(d.Tabs,{activeKey:e,tabPosition:"left",tabBarStyle:{width:"224px"},onChange:this.handleTabsChange},n.a.createElement(d.Tabs.TabPane,{tab:"基本设置",key:"1"},n.a.createElement(v,null)),n.a.createElement(d.Tabs.TabPane,{tab:"文章设置",key:"2"},n.a.createElement(D,null))))}}t.default=Object(s.withRouter)(Object(c.b)((function(e){return{login:e.common.login}}))(z))},37:function(e,t,r){var a=r(38);"string"==typeof a&&(a=[[e.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(18)(a,i);a.locals&&(e.exports=a.locals)},38:function(e,t,r){(t=e.exports=r(17)(!1)).push([e.i,".ReactCrop{position:relative;display:inline-block;cursor:crosshair;overflow:hidden;max-width:100%;background-color:#000}.ReactCrop:focus{outline:none}.ReactCrop--disabled,.ReactCrop--locked{cursor:inherit}.ReactCrop__image{display:block;max-width:100%;max-height:-webkit-fill-available;max-height:-moz-available;max-height:fill-available}.ReactCrop--crop-invisible .ReactCrop__image{opacity:0.5}.ReactCrop__crop-selection{position:absolute;top:0;left:0;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);box-sizing:border-box;cursor:move;box-shadow:0 0 0 9999em rgba(0,0,0,0.5);border:1px solid;border-image-source:url(\"data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==\");border-image-slice:1;border-image-repeat:repeat}.ReactCrop--disabled .ReactCrop__crop-selection{cursor:inherit}.ReactCrop__drag-handle{position:absolute;width:9px;height:9px;background-color:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.7);box-sizing:border-box;outline:1px solid transparent}.ReactCrop .ord-nw{top:0;left:0;margin-top:-5px;margin-left:-5px;cursor:nw-resize}.ReactCrop .ord-n{top:0;left:50%;margin-top:-5px;margin-left:-5px;cursor:n-resize}.ReactCrop .ord-ne{top:0;right:0;margin-top:-5px;margin-right:-5px;cursor:ne-resize}.ReactCrop .ord-e{top:50%;right:0;margin-top:-5px;margin-right:-5px;cursor:e-resize}.ReactCrop .ord-se{bottom:0;right:0;margin-bottom:-5px;margin-right:-5px;cursor:se-resize}.ReactCrop .ord-s{bottom:0;left:50%;margin-bottom:-5px;margin-left:-5px;cursor:s-resize}.ReactCrop .ord-sw{bottom:0;left:0;margin-bottom:-5px;margin-left:-5px;cursor:sw-resize}.ReactCrop .ord-w{top:50%;left:0;margin-top:-5px;margin-left:-5px;cursor:w-resize}.ReactCrop__disabled .ReactCrop__drag-handle{cursor:inherit}.ReactCrop__drag-bar{position:absolute}.ReactCrop__drag-bar.ord-n{top:0;left:0;width:100%;height:6px;margin-top:-3px}.ReactCrop__drag-bar.ord-e{right:0;top:0;width:6px;height:100%;margin-right:-3px}.ReactCrop__drag-bar.ord-s{bottom:0;left:0;width:100%;height:6px;margin-bottom:-3px}.ReactCrop__drag-bar.ord-w{top:0;left:0;width:6px;height:100%;margin-left:-3px}.ReactCrop--new-crop .ReactCrop__drag-bar,.ReactCrop--new-crop .ReactCrop__drag-handle,.ReactCrop--fixed-aspect .ReactCrop__drag-bar{display:none}.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-n,.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-e,.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-s,.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-w{display:none}@media (max-width: 768px), (pointer: coarse){.ReactCrop__drag-handle{width:17px;height:17px}.ReactCrop .ord-nw{margin-top:-9px;margin-left:-9px}.ReactCrop .ord-n{margin-top:-9px;margin-left:-9px}.ReactCrop .ord-ne{margin-top:-9px;margin-right:-9px}.ReactCrop .ord-e{margin-top:-9px;margin-right:-9px}.ReactCrop .ord-se{margin-bottom:-9px;margin-right:-9px}.ReactCrop .ord-s{margin-bottom:-9px;margin-left:-9px}.ReactCrop .ord-sw{margin-bottom:-9px;margin-left:-9px}.ReactCrop .ord-w{margin-top:-9px;margin-left:-9px}.ReactCrop__drag-bar.ord-n{height:14px;margin-top:-7px}.ReactCrop__drag-bar.ord-e{width:14px;margin-right:-7px}.ReactCrop__drag-bar.ord-s{height:14px;margin-bottom:-7px}.ReactCrop__drag-bar.ord-w{width:14px;margin-left:-7px}}.imageCropper-38CPD{display:inline-block;font-size:0;line-height:0}.imageCropper-38CPD.active::before{content:'';position:fixed;top:0;bottom:0;left:0;right:0;z-index:9998;background:rgba(255,255,255,0.5)}.imageCropper-38CPD .selector{position:relative;display:inline-block;cursor:pointer}.imageCropper-38CPD .selector input{position:absolute;top:0;left:0;opacity:0;z-index:1;width:100%;height:100%;display:block;cursor:pointer}.imageCropper-38CPD .selector .default-select{width:50px;height:50px;border-radius:3px;border:1px dashed #333333;display:block;position:relative;cursor:pointer}.imageCropper-38CPD .selector .default-select::before{content:'';position:absolute;width:2px;margin-left:-1px;height:50%;background-color:#333333;left:50%;top:25%;z-index:0;border-radius:1px}.imageCropper-38CPD .selector .default-select::after{content:'';position:absolute;height:2px;margin-top:-1px;width:50%;background-color:#333333;top:50%;left:25%;z-index:0;border-radius:1px}.crop-wrapper{position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);box-shadow:0px 5px 16px 0px rgba(0,0,0,0.95);z-index:9999}.crop-wrapper .ReactCrop{display:block}.crop-wrapper .tools{position:absolute;bottom:0;width:100%;padding:10px;left:0;color:white;background:-webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0,0,0,0)), to(rgba(0,0,0,0.5)));background:linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0.5) 100%);display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}.crop-wrapper .tools button{cursor:pointer;border:1px dashed #fff;margin:0 3px;font-size:12px;line-height:20px}.crop-wrapper .tools button:hover{background:#fff;color:#999}\n",""]),t.locals={cropper:"imageCropper-38CPD"}},40:function(e,t,r){"use strict";var a=r(30),i=r.n(a),o=r(0),n=r.n(o),s=r(14),c=r.n(s),l=r(49),p=r.n(l),d=r(37),h=r.n(d);class g extends o.PureComponent{constructor(e){super(e),i()(this,"state",{originalSrc:"",crop:{x:0,y:0}}),i()(this,"originalFileName",""),i()(this,"image",void 0),i()(this,"pixelCrop",void 0),i()(this,"inputRef",n.a.createRef()),i()(this,"handleFileInput",e=>{const t=e.target.files&&e.target.files[0];if(t)if(this.originalFileName=t.name,"image/gif"===t.type){const{onConfirm:e}=this.props;e&&e(t)}else{const e=new FileReader;e.readAsDataURL(t),e.onload=()=>{this.setState({originalSrc:e.result})}}}),i()(this,"handleCropChange",(e,t)=>{this.setState({crop:e}),this.pixelCrop=t}),i()(this,"handleImageloaded",(e,t)=>{this.image=e,this.pixelCrop=t}),i()(this,"getCroppedImg",(e,t,r)=>{const a=document.createElement("canvas");a.width=t.width,a.height=t.height;const i=a.getContext("2d");return i&&i.drawImage(e,t.x,t.y,t.width,t.height,0,0,t.width,t.height),new Promise((e,t)=>{a.toBlob(t=>{t.name=r,e(t)},"image/jpeg")})}),i()(this,"confirm",async()=>{const{onConfirm:e}=this.props;if(this.image&&this.pixelCrop&&e){this.pixelCrop.width=this.pixelCrop.width||this.image.naturalWidth,this.pixelCrop.height=this.pixelCrop.height||this.image.naturalHeight,e(await this.getCroppedImg(this.image,this.pixelCrop,this.originalFileName))}this.cancel()}),i()(this,"cancel",()=>{this.setState({originalSrc:""}),this.inputRef.current&&(this.inputRef.current.value="")}),e.crop&&(this.state.crop=e.crop)}render(){const{originalSrc:e,crop:t}=this.state,{children:r}=this.props;let a;return e&&(a=n.a.createElement("div",{className:"crop-wrapper"},n.a.createElement(p.a,{src:e,crop:t,onImageLoaded:this.handleImageloaded,onChange:this.handleCropChange}),n.a.createElement("div",{className:"tools"},n.a.createElement("button",{type:"button",onClick:this.confirm},"确定"),n.a.createElement("button",{type:"button",onClick:this.cancel},"取消")))),n.a.createElement("div",{className:`${h.a.cropper} ${e?"active":""}`},n.a.createElement("div",{className:"selector"},r||n.a.createElement("span",{className:"default-select"}),n.a.createElement("input",{ref:this.inputRef,type:"file",onInput:this.handleFileInput,accept:"image/*"})),c.a.createPortal(a,document.body))}}var m=g,u=r(50),b=r.n(u),f=r(33),x=r(11);class A extends o.PureComponent{constructor(e){super(e),i()(this,"cos",void 0),i()(this,"file",void 0),i()(this,"credential",{TmpSecretId:"",TmpSecretKey:"",XCosSecurityToken:"",ExpiredTime:0}),i()(this,"region",""),i()(this,"bucket",""),i()(this,"directory",""),i()(this,"domain",""),i()(this,"upload",()=>{const{onUploaded:e,uploadDir:t,bucketType:r}=this.props;if("user"!==r&&!t)return console.warn("上传目录未指定");const a=this.directory||t,i=`${Date.now()}_${this.file.name}`;this.cos.putObject({Bucket:this.bucket,Region:this.region,Key:`${a}/${i}`,Body:this.file,onProgress(e){const{loaded:t,total:r,speed:a,percent:i}=e;console.log("percent ::",i)}},(t,r)=>{if(t)return console.log(t);const{Location:a}=r;e&&e({key:a,directory:this.directory,filename:i,originFilename:this.file.name,domain:this.domain})})}),i()(this,"handleConfirm",e=>{this.file=e,this.upload()}),this.cos=new b.a({getAuthorization:async(e,t)=>{t(await this.getCredential())}}),this.getCredential()}async getCredential(){const{bucketType:e}=this.props;if(this.credential.ExpiredTime<Date.now()){const{status:t,message:r,data:a}=await Object(f.f)(e);return"success"===t?(this.credential={TmpSecretId:a.credentials&&a.credentials.tmpSecretId,TmpSecretKey:a.credentials&&a.credentials.tmpSecretKey,XCosSecurityToken:a.credentials&&a.credentials.sessionToken,ExpiredTime:1e3*a.expiredTime},this.region=a.region,this.bucket=a.bucket,this.directory=a.directory,this.domain=a.domain,this.credential):(x.message.error(r),{})}return this.credential}render(){const{children:e,crop:t}=this.props;return n.a.createElement(m,{onConfirm:this.handleConfirm,crop:t},e)}}t.a=A}}]);