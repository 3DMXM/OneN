# OneN

使用 Node.js + Vue 写的一个另一个OneDrive网盘项目

解决了前任(OneX)遗留下来的并发问题

> 吐槽：PHP项目的并发问题确实有点大， 4核8G 的服务器居然负载过高宕机了，我看访问量也不高啊，这一看服务器占用，全是php的进程，然后想着可能是代码优化问题，看能不能解决一下吧，打开源码一看，这是哪个白痴写的代码，都是啥玩意？？哦，是我自己写的，那没事了 

> 算了，还是重新写个项目吧，旧的不想维护了，于是，OneN就问世了


### 相较于OneX的优点和缺点

**优点**
- 优化好，相较于OneX性能提升90%
- 优化数据库储存方式，读写更快
- API数据缓存，解决访问量过高时调用接口限制的问题
- 前端使用 Vue Router ，页面使用懒加载，跳转不会占用服务器流量
- 前后端完全分离，使用Ajax传递数据，按需加载，页面无刷新获取数据
- 同文件多配置，只需要一份文件，即可绑定多个域名和数据库

**缺点**
- 新项目，可能我后续又会弃坑，而导致烂尾
- 因为前后端完全分离了，两边都有自己的路由，可能后续维护会很麻烦
- 视频、文件、音乐 现在还无法在线播放和查看，这个后续可能会解决
- Node项目有个问题，如果运行报错， 服务器会直接停止，导致网站无法访问



### 前置要求
- git https://git-scm.com/
- Node.js https://nodejs.org/zh-cn/

### 使用方法
1. 拉取代码 `git clone https://git.aoe.top/aoe.top/OneN.git`
2. 进入server文件夹, `cd server`
3. 安装依赖 `npm i` 
4. 在 model/config.js 里面配置`数据库`以及你的 `token.clientId` 和 `token.clientSecret`
5. 将`OneN.sql`这个数据库模板导入到你自己的数据库中
6. 运行程序 `node app.js <POST> <CONFIG>`
    - `POST`  是 端口号，不填默认是 3001
    - `CONFIG` 是数据配置名称 就是 `model/config.js`文件里面 MySqlConfig[CONFIG]的东西，可以自定义，但如果自定义的话同时记得在 `MySqlConfig`里面添加对应的对象， 不填默认是 `pan`    
7. 提示启动成功后，用浏览器打开  http://localhost:3001/init 来登录你的onedrive账号，登录授权之后，看看数据库的token里面是否已经有数据。`因为这里有个Bug，授权完毕之后程序会报错，服务器崩溃，但实际上已经完成操作了`
8. 接下来访问 http://localhost:3001 就可以看到网盘了


### 另外

- 你可以使用我的 `clientId` 和 `clientSecret`，但你的回调域名得是 http://localhost:3001/  
不过还是建议你自己到 [Azure 应用注册页面](https://aka.ms/AppRegistrations/?referrer=https%3A%2F%2Fdev.onedrive.com) 去注册一个自己的应用

- 后台用户是需要你自己到数据库里面去加一个的，密码使用双重MD5加密，你可以简单写个加密代码将自己想要的密码加密然后丢到数据库里面去，  
后台地址 是  /~admin

