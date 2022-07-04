const formatTime = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
	n = n.toString();
	return n[1] ? n : '0' + n;
};

// YYYY-MM-dd h:m:s格式转化时间戳
function datetimeToUnix(datetime) {
	var tmp_datetime = datetime.replace(/:/g, '-');
	tmp_datetime = tmp_datetime.replace(/ /g, '-');
	var arr = tmp_datetime.split('-');
	var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
	return parseInt(now.getTime() / 1000);
}

// 时间补零
function addZero(v) {
	return v < 10 ? '0' + v : v;
}

// 后台时间格式处理 
function switchTimeFormat(time) {
	const dateTime = new Date(time);
	const year = dateTime.getFullYear();
	const month = dateTime.getMonth() + 1;
	const date = dateTime.getDate();
	const hour = dateTime.getHours();
	const minute = dateTime.getMinutes();
	const second = dateTime.getSeconds();
	var timer = year + '-' + addZero(month) + '-' + addZero(date) + ' ' + addZero(hour) + ':' + addZero(
		minute) + ':' + addZero(second);
	if (timer == 'NaN-NaN-NaN NaN:NaN:NaN') {
		return true;
	} else {
		return timer;
	}
}

// 后台时间格式处理
function switchTimeFormatHZ(time) {
	const dateTime = new Date(time);
	const year = dateTime.getFullYear();
	const month = dateTime.getMonth() + 1;
	const date = dateTime.getDate();
	const hour = dateTime.getHours();
	const minute = dateTime.getMinutes();
	const second = dateTime.getSeconds();
	var timer = addZero(hour) + ':' + addZero(
		minute);
	if (timer == 'NaN:NaN') {
		return true;
	} else {
		return timer;
	}
}


// 后台时间格式处理 聊天处理
function switchTimeFormatBD(time) {
	const dateTime = new Date(time);
	const newTime = new Date();
	const year = dateTime.getFullYear();
	const month = dateTime.getMonth() + 1;
	const date = dateTime.getDate();
	const hour = dateTime.getHours();
	const minute = dateTime.getMinutes();
	const second = dateTime.getSeconds();
	var timer = addZero(hour) + ':' + addZero(minute);
	var timerY = addZero(month) + '-' + addZero(date);
	if (newTime - dateTime > 86400000 && newTime - dateTime < 172800000 && timer != 'NaN:NaN') {
		return '昨天' + timer;
	} else if (newTime - dateTime > 172800000 && timerY != 'NaN:NaN') {
		return timerY;
	} else if (newTime - dateTime < 86400000) {
		return timer;
	} else {
		return true;
	}
}

//取两位小数
function numToFixed(num) {
	if (num) {
		return num.toFixed(2)
	}
}

//格式化
function jsonParse(data) {
	if (data) {
		return JSON.parse(data)
	}
}

//字符截取
function strIntercept(data, num) {
	if (data) {
		var str = data.slice(0, num);
		if (str.length > 20) {
			str = str + '...';
		}
		return str
	}
}

//字符截取
function strIntercept_num(data, num) {
	if (data) {
		var str = data.slice(0, num);
		return str
	}
}

//文字格式处理
function textProcessing(str) {
	if (str) {
		str.toString().replace(/↵/g, "\n")
		return str;
	}
}

// 图片处理
function imageUtil(e) {
	var imageSize = {};
	var originalWidth = e.detail.width; //图片原始宽 
	var originalHeight = e.detail.height; //图片原始高 
	var originalScale = originalHeight / originalWidth; //图片高宽比 
	console.log('originalWidth: ' + originalWidth)
	console.log('originalHeight: ' + originalHeight)
	imageSize.imageWidth = originalWidth;
	imageSize.imageHeight = originalHeight;
	//获取屏幕宽高 
	wx.getSystemInfo({
		success: function(res) {
			var windowWidth = res.windowWidth;
			var windowHeight = res.windowHeight;
			var windowscale = windowHeight / windowWidth; //屏幕高宽比 
			if (originalScale < windowscale) { //图片高宽比小于屏幕高宽比 
				//图片缩放后的宽为屏幕宽 
				imageSize.imageWidth = windowWidth;
				imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
			} else { //图片高宽比大于屏幕高宽比 
				//图片缩放后的高为屏幕高 
				imageSize.imageHeight = windowHeight;
				imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
			}
			imageSize.imageWidth = windowWidth;
			imageSize.imageHeight = windowHeight;
		}
	})
	console.log('缩放后的宽: ' + imageSize.imageWidth)
	console.log('缩放后的高: ' + imageSize.imageHeight)
	return imageSize;
}

// 弱口令判断
function passwordCode(value) {
	var m = /(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
	if (value.match(m)) {
		console.log('通过');
		return true;
	} else {
		console.log('弱口令');
		return false;
	}
}


//校验手机号是否合法
function isPhoneNum(phonenum) {
	var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if (reg.test(phonenum)) {
		return true;
	} else {
		return false;
	}
}

// https://uniapp.dcloud.io/api/other/authorize?id=authorize
// scope.userInfo 用户信息
// scope.userLocation 用户地址
// scope.userLocationBackground 后台定位
// scope.address 通信地址
// scope.record 录音功能
// scope.writePhotosAlbum 保存到相册
// scope.camera 摄像头
// scope.invoice 获取发票
// scope.invoiceTitle 发票抬头
// scope.werun 微信运动步数

// 定义微信小程序授权状态
let authorObj={
	'scope.userInfo':'用户信息',
	'scope.userLocation':'地理位置',
	'scope.userLocationBackground':'后台定位',
	'scope.address':'用户地址',
	'scope.record':'录音功能',
	'scope.writePhotosAlbum':'保存到相册',
	'scope.camera':'摄像头',
	'scope.invoice':'获取发票',
	'scope.invoiceTitle':'发票抬头',
	'scope.werun':'微信运动步数',
}

// 授权 使用方法 this.$utils.onSaveAuthorize(authorObj定义方法)
function onSaveAuthorize(jurisdiction) {
	return new Promise((resolve, reject) => {
		// 开始授权，指定授权
		getSetting().then(res => {
			console.log(res);
			// 判断用户是否授权了保存到本地的权限
			console.log(!res.authSetting[jurisdiction]);
			if (!res.authSetting[jurisdiction]) {
				authorize(jurisdiction)
					.then(() => {
						console.log(authorObj[jurisdiction],'该项权限用户接受授权');
						resolve(true);
					})
					.catch(() => {
						console.log(authorObj[jurisdiction],'该项权限用户拒绝授权，需要打开授权模态窗');
						uni.hideLoading();
						showModal(jurisdiction);
						reject(false);
					});
			} else {
				console.log(authorObj[jurisdiction],'该项权限已授权');
				resolve(true);
			}
		});
	});
}

// 消息订阅 使用方法 this.$utils.onSaveAuthorizeSub()
function onSaveAuthorizeSub() {
	return new Promise((resolve, reject) => {
		// 开始授权，指定授权
		getSetting().then(res => {
			// 判断用户是否授权消息订阅的权限
			console.log(res);
			console.log(!res.subscriptionsSetting['mainSwitch']);
			if (!res.subscriptionsSetting['mainSwitch']) {
				showModal('消息订阅');
				reject(false);
			} else {
				resolve(true);
			}
		});
	});
}

// 发起首次授权请求
function authorize(jurisdiction) {
	return new Promise((resolve, reject) => {
		uni.authorize({
			scope: jurisdiction,
			success: () => {
				resolve();
			},
			fail: res => {
				//这里是用户拒绝授权后的回调
				console.log('拒绝授权',authorObj[jurisdiction]);
				reject();
			}
		});
	});
}

// 弹出模态框提示用户是否要去设置页授权
function showModal(jurisdiction) {
	uni.showModal({
		title: jurisdiction=='消息订阅'?'检测到您没有打开'+jurisdiction+'的权限，是否前往设置打开？':'检测到您没有打开'+authorObj[jurisdiction] +'的权限，是否前往设置打开？',
		success: res => {
			if (res.confirm) {
				console.log('用户点击确定');
				onOpenSetting(jurisdiction); // 打开设置页面
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
}

//打开设置，引导用户授权
function onOpenSetting(jurisdiction) {
	uni.openSetting({
		success: res => {
			console.log(res.authSetting);
			if(jurisdiction=='消息订阅'){
				if (!res.subscriptionsSetting.mainSwitch) {
					uni.showToast({
						title: '授权失败',
						icon: 'none',
						duration: 1000
					});
				} else {
					console.log('开启授权'+jurisdiction+'完成');
				}
			}else{
				if (!res.authSetting[jurisdiction]) {
					uni.showToast({
						title: '授权失败',
						icon: 'none',
						duration: 1000
					});
				} else {
					console.log('开启授权'+authorObj[jurisdiction]+'完成');
				}
			}
		}
	});
}

// 获取用户已经授予了哪些权限
function getSetting() {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			withSubscriptions: true,
			success: res => {
				resolve(res);
			}
		});
	});
}

module.exports = {
	formatTime: formatTime,
	switchTimeFormat: switchTimeFormat,
	switchTimeFormatHZ: switchTimeFormatHZ,
	switchTimeFormatBD: switchTimeFormatBD,
	numToFixed: numToFixed,
	jsonParse: jsonParse,
	datetimeToUnix: datetimeToUnix,
	strIntercept: strIntercept,
	strIntercept_num: strIntercept_num,
	textProcessing: textProcessing,
	imageUtil: imageUtil,
	passwordCode: passwordCode,
	isPhoneNum: isPhoneNum,
	onSaveAuthorize: onSaveAuthorize,
	onSaveAuthorizeSub:onSaveAuthorizeSub,
};
