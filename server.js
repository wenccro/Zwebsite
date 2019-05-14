const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
var path=require('path');
const multer=require('multer');//上传文件
const multerObj=multer({dest:'./static/upload'});//上传的内容
const mysql=require('mysql');
const cookieParse=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');
var ueditor=require('ueditor');

var server=express();

//控制器
//控制外部访问的  主控制器 //所有请求跟目录的我都让他访问  外部的内容
var admintrol=require('./route/admin/index.js');//引入管理员访问的  主控制器

//处理首页轮播控制器
var home_manage=require('./route/admin/home.js');
//处理首页明星产品
var home_start=require('./route/admin/home_start.js');
//处理产品中心
var pro_tz=require('./route/admin/pro_tz.js');
//处理产品列表
var pro_tzm=require('./route/admin/pro_tzm.js');
//处理 新闻中心
var news_pro=require('./route/admin/news_pro.js');
//处理保养信息
var home_maintain=require('./route/admin/home_maintain.js');
//留言区域
var tele_table=require('./route/admin/tele_table.js');



//1 获取请求数据
server.use(bodyParser.json());//处理发送请求是 application/json
server.use(bodyParser.urlencoded({extended:false}));//处理发送请求是 application/x-www-form-urlencoded

//cookie session
server.use(cookieParse());
(function(){
	var keys=[];
	for(var i=0;i<10000;i++){
		keys[i]='fbadh'+Math.random();
	}
	server.use(cookieSession({
		name:'sess_id',
		keys:keys,
		maxAge:180*60*1000
	}));
})();

//注意顺序   先处理富文本编辑器的内容
//*********************************************************************
//富文本设置
var ueditor=require('ueditor');
//设置静态目录
server.use(express.static(__dirname+'/static'));
//设置中间件处理ueditor的后台请求
server.use("/ueditor/getImg", ueditor(path.join(__dirname, '/static'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/images/ueditor/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
/****************************************************************/
//在处理文件上传的处理
server.use(multerObj.any());//上传任何文件
//模板
server.engine('html',consolidate.ejs);//用ejs引擎来渲染html
server.set('views','template');//template存放运行后的文件
server.set('view engine','html');

//分化各个请求
server.use('/'        ,require('./route/web')());//调用控制器 里面的一个方法
server.use('/admin'   ,admintrol.checkmain());//访问admin 就执行主控制器里面的一个方法

//对首页请求的处理
server.get('/admin/home',home_manage.showhome);//拉取列表显示内容
server.get('/admin/homesadd',home_manage.addhome);//处理轮播添加里面a标签
server.post("/admin/home_add",home_manage.addIm);//添加除图片以外的数据
server.post("/admin/homeAddImage",home_manage.addImage);//添加图片
server.delete("/admin/c_delete",home_manage.deleteImage);//删除照片
server.get("/admin/alter",home_manage.alterPage);//转至修改页面
server.post("/admin/alters",home_manage.alters);//修改页面
server.post("/admin/home_alter",home_manage.alterIm);//修改除图片以外的数据
server.post("/admin/homeAlterImage",home_manage.alterImage);//修改图片

//对首页明星产品的处理
server.get('/admin/start',home_start.showhome);//拉取列表显示内容
server.get('/admin/homesSadd',home_start.addhome);//处理明星添加里面a标签
server.post("/admin/home_stadd",home_start.addIm);//添加除图片以外的数据
server.post("/admin/homeSTAddImage",home_start.addImage);//添加图片
server.delete("/admin/st_delete",home_start.deleteImage);//删除照片
server.get("/admin/stalter",home_start.alterPage);//转至修改页面
server.post("/admin/stalters",home_start.alters);//拉取修改页面内容
server.post("/admin/home_stalter",home_start.alterIm);//修改除图片以外的数据
server.post("/admin/homeStlterImage",home_start.alterImage);//修改图片

//产品中心的出路
server.get('/admin/tzpro',pro_tz.showhome);//拉取列表显示内容
server.get('/admin/homestzadd',pro_tz.addhome);//处理明星添加里面a标签
server.post("/admin/home_tzadd",pro_tz.addIm);//添加
server.delete("/admin/tz_delete",pro_tz.deletetz);//删除特征
server.get("/admin/protz",pro_tz.alterPage);//转至修改页面
server.post("/admin/tzters",pro_tz.alters);//发送数据给修改有
server.post("/admin/home_tzalter",pro_tz.alterIm);//修改

//产品中心列表
server.get("/admin/tzmlist",pro_tzm.showhome);
server.delete("/admin/tzm_delete",pro_tzm.deleteImage);
server.get('/admin/homestzmadd',pro_tzm.addhome);//转至页面
server.get('/admin/tzmimages',pro_tzm.addofiamge);//转至同款产品页面添加
server.get('/admin/tzmadddata',pro_tzm.addtzmdata);// 同款产品页面 添加页面拉取属性值
server.post("/admin/tzm_stadd",pro_tzm.addIm);//添加图片以外的数据
server.post("/admin/tzmSTAddImage",pro_tzm.addImage);//添加图片
server.get("/admin/tzmalter",pro_tzm.alterPage);//转至修改页面
server.post("/admin/tzmalters",pro_tzm.alters);//往修改页面发送信息
server.post("/admin/tzm_stalter",pro_tzm.alterIm);//修改除图片以外是信息
server.post("/admin/tzmStlterImage",pro_tzm.alterImage);//修改图片
server.get("/admin/tzmalterImgs",pro_tzm.addAlterImages);//转至同款次要产品修改页面
server.post("/admin/tzmalterImagsData",pro_tzm.alterTwoData);//拉取次要图片的全部数据

//新闻中心列表
server.get("/admin/newslist",news_pro.showhome);;
server.delete("/admin/news_delete",news_pro.deleteImage);
server.get('/admin/newsadd',news_pro.addhome);//a标签转至页面
server.post("/admin/news_stadd",news_pro.addIm);//添加数据
server.post("/admin/newImage",news_pro.addImage);//添加图片
server.get("/admin/newalter",news_pro.alterPage);//转至修改页面
server.post("/admin/news_lters",news_pro.alters);//往修改页面发送信息
server.post("/admin/news_alter",news_pro.alterIm);//修改图片以外的数据
server.post('/admin/news_alterImage',news_pro.alterImga);//修改图片

//保养信息列表
server.get("/admin/tainlist",home_maintain.showhome);;
server.delete("/admin/tain_delete",home_maintain.deleteImage);
server.get('/admin/tainadd',home_maintain.addhome);//a标签转至页面
server.post("/admin/tain_stadd",home_maintain.addIm);//添加数据
server.post("/admin/tainImage",home_maintain.addImage);//添加图片
server.get("/admin/tainalter",home_maintain.alterPage);//转至修改页面
server.post("/admin/tain_lters",home_maintain.alters);//往修改页面发送信息
server.post("/admin/tain_alter",home_maintain.alterIm);//修改图片以外的数据
server.post('/admin/tain_alterImage',home_maintain.alterImga);//修改图片

//留言区域处理
server.get('/admin/tele',tele_table.showhome);//拉取列表显示内容
server.delete("/admin/tele_delete",tele_table.deletetele);//删除照片
server.get("/admin/tele_look",tele_table.alterPage);//转至修改页面
server.post("/admin/telook",tele_table.alters);//修改页面

//静态文件
//server.use(static('./static'));
//server.use(express.static(__dirname+'/static'));
server.listen(7776);
console.log("服务器已在7776打开");
