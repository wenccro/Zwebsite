//加密部分，为了在数据库中   管理员  的密码使用加密 的密码
const crypto=require('crypto');

module.exports={
	MD5_SUFFIX:'wehidhfihfeihfioehiheofh(美女恒大华府？)ehejkdhfjekhjkefh',
	md5:function(str){
		var obj=crypto.createHash('md5');//使用md5签名的方法式，
		obj.update(str);
		return obj.digest('hex');
	}
}


 /* 仅仅为提前在数据库中  录入数据*/
//const common=module.exports;
//var str='admin';
//var str=common.md5(str+'wehidhfihfeihfioehiheofh(美女恒大华府？)ehejkdhfjekhjkefh');
//
//console.log(str);