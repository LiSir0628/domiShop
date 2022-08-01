/**
 * 提示框
 * 
 * title	提示文字---在小程序中最多显示两行
 * duration	提示的延迟时间  默认1500ms
 * icon		提示图标(success成功,loading加载中,none不显示) 默认不显示
 * */
const toast = (title, duration = 1500, icon = 'none', mask = false) => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

/**
 * 提示模态框
 * 
 * content	提示内容
 * showCancel 是否显示取消按钮 默认显示false
 * */
const modal = (content, showCancel = false) => {
	if (Boolean(content) === false) {
		return;
	}
	uni.showModal({
		title: '温馨提示',
		content: content,
		showCancel: showCancel,
		success: function(res) {
			if (res.confirm) {
				console.log('confirm');
			} else if (res.cancel) {
				console.log('cancel');
			}
		}
	})
}

/**
 * 查找数组arr中对应属性名为property且属性值为val的元素
 * flag非必传 flag=true则返回对应数组下标
 * 没找到返回false
 * */
const inArray = (arr, property, val, flag) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][property] == val) {
			return flag ? i : arr[i];
		}
	}
	return false;
}

/**
 * 生成x-y的随机整数
 * */
const random = (x, y) => {
	return parseInt(Math.random() * (y - x + 1)) + x;
}

/**
 * 剩余时间计算
 * 
 * time		需要计算的时间戳 单位:ms
 * 时间结束则返回0
 * */
const countDown = (time) => {
	let date = new Date();
	let date_differ = time - date.getTime(); // 时间差的毫秒数
	if (date_differ < 0) return 0;
	// 计算相差天数
	let days = Math.floor(date_differ / (24 * 3600 * 1000));
	// 计算小时数
	let leave1 = date_differ % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
	let hours = Math.floor(leave1 / (3600 * 1000));
	// 计算分钟数
	let leave2 = (date_differ % (24 * 3600 * 1000)) % (3600 * 1000); // 计算小时数后剩余的毫秒数
	let minutes = Math.floor(leave2 / (60 * 1000));
	// 计算秒数
	let leave3 = (date_differ % (24 * 3600 * 1000)) % (60 * 1000); // 计算分钟数后剩余的毫秒数
	let seconds = Math.round(leave3 / 1000);
	return {
		days,
		hours,
		minutes,
		seconds
	};
}

/**
 * 日期实时转换几分钟前 几小时前等
 * 
 * time		需要计算的时间戳 单位:ms
 * */
const getFormatTime = (timeStamp) => {
	let dateTime = new Date(timeStamp);
	let no1new = dateTime.valueOf();
	let year = dateTime.getFullYear();
	let month = dateTime.getMonth() + 1;
	let day = dateTime.getDate();
	let hour = dateTime.getHours();
	let minute = dateTime.getMinutes();
	let second = dateTime.getSeconds();
	let now = new Date();
	let now_new = now.valueOf();
	let milliseconds = 0;
	let timeSpanStr;

	milliseconds = now_new - no1new;

	if (milliseconds <= 1000 * 60 * 1) {
		timeSpanStr = '刚刚';
	} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
		timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
	} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
	} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
	} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
		timeSpanStr = year + '-' + month + '-' + day
	} else {
		timeSpanStr = year + '-' + month + '-' + day
	}

	return timeSpanStr;
}

/**
 * 时间格式转换
 * 
 * time		要转换的时间戳 单位:ms
 * */
const transformTime = (time, data) => {
	if (time) {
		let date = new Date(time);
		let y = date.getFullYear();
		let M = date.getMonth() + 1;
		let d = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		if (data && data.toLowerCase() === 'yyyy-mm') {
			return `${y}-${addZero(M)}`;
		} else if (data && data.toLowerCase() === 'yyyy-mm-dd') {
			return `${y}-${addZero(M)}-${addZero(d)}`;
		} else if (data && data.toLowerCase() === 'mm-dd') {
			return `${addZero(M)}-${addZero(d)}`;
		} else if (data && data.toLowerCase() === 'yyyy/mm/dd') {
			return `${y}/${addZero(M)}/${addZero(d)}`;
		} else if (data && data.toLowerCase() === 'mm-dd hh:mm') {
			return `${addZero(M)}-${addZero(d)} ${addZero(h)}:${addZero(m)}`;
		} else if(data && data.toLowerCase() === 'mm-dd hh:mm:ss'){
			return `${addZero(M)}-${addZero(d)} ${addZero(h)}:${addZero(m)}:${addZero(s)}`;
		} else if (data && data.toLowerCase() === 'yyyy-mm-dd hh:mm:ss') {
			return `${y}-${addZero(M)}-${addZero(d)} ${addZero(h)}:${addZero(m)}:${addZero(s)}`;
		} else if (data && data.toLowerCase() === 'yyyy-mm-dd hh:mm') {
			return `${y}-${addZero(M)}-${addZero(d)} ${addZero(h)}:${addZero(m)}`;
		} else if (data && data.toLowerCase() === 'mm:ss') {
			return `${addZero(m)}:${addZero(s)}`;
		} else if (data === undefined) {
			return `${y}年${addZero(M)}月${addZero(d)}日 ${addZero(h)}:${addZero(m)}`;
			// return `${y}年${addZero(M)}月${addZero(d)}日 ${addZero(h)}:${addZero(m)}:${addZero(s)}`;
		} else if (data === '年月日') {
			return `${y}年${addZero(M)}月${addZero(d)}日`;
		} else if (data === '月') {
			return `${addZero(M)}月`;
		} else if (data === '年月') {
			return `${y}年${addZero(M)}月`;
		} else if (data === '月日 hh:mm') {
			return `${addZero(M)}月${addZero(d)}日 ${addZero(h)}:${addZero(m)}`;
		} else if (data === 'yyyy.mm.dd') {
			return `${y}.${addZero(M)}.${addZero(d)}`;
		} else if (data === '年月日 hh:mm') {
			return `${y}年${addZero(M)}月${addZero(d)}日 ${addZero(h)}:${addZero(m)}`;
		} else if (data === '月日 时分') { // 10月10日 10时10分
			return `${addZero(M)}月${addZero(d)}日 ${addZero(h)}时${addZero(m)}分`;
		} else {
			console.log('data参数错误')
			return;
		}
	} else {
		return '';
	}
}

function addZero(m) {
	return m < 10 ? `0${m}` : m;
}

/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
 * 
 * key 缓存名称
 * data 缓存数据
 * timeout 过期时间（单位：分钟）不设置时间即为永久保存
 */
const setStorageSync = (key, data, timeout = 0) => {
	let _timeout = parseInt(timeout);

	uni.setStorageSync(key, data);

	if (_timeout) {
		uni.setStorageSync(`${key}__separator__`, Date.now() + 1000 * 60 * _timeout);
	} else {
		uni.setStorageSync(`${key}__separator__`, '');
	}
}

/**
 * 从本地缓存中同步获取指定 key 对应的内容。
 * 
 * key 缓存名称
 * def 若想要无缓存时，返回默认值则get('key','默认值')
 */
const getStorageSync = (key, def = '') => {
	let timeout = parseInt(uni.getStorageSync(`${key}__separator__`) || 0);

	// 过期失效
	if (timeout) {
		if (Date.now() > timeout) {
			remove(key);
			return;
		}
	}

	let value = uni.getStorageSync(key);
	return value ? value : def;
}

/**
 * 从本地缓存中同步移除指定 key。
 * 
 * key 缓存名称
 */

const remove = (key) => {
	uni.removeStorageSync(key);
	uni.removeStorageSync(`${key}__separator__`);
	return undefined;
}

/**
 * 将query参数获取转化json对象
 */
const queryParam = (param) => {
	delete param.pathMatch;
	delete param.code;
	delete param.state;
	delete param.appid;
	return param;
}
/**
 * 判断是否是微信打开
 */
const isOpenType = () => {
	let ua = navigator.userAgent.toLowerCase();
	let isWeixin = ua.indexOf('micromessenger') != -1;
	if (isWeixin) {
		return 'wx';
	} else {
		if (ua.indexOf('wxwork') != -1) {
			return 'et'
		} else {
			return 'h5'
		}
	}
}

/**
 * 路由跳转
 */
const domiRouter = ($this, path, param) => {
	let query = $this.$Route.query;
	console.log($this.$Route.query)
	if (query.hasOwnProperty('token')) {
		param['token'] = query.token;
	}
	$this.$Router.push({
		path: '/' + query.pathMatch + '/' + path,
		query: param
	})
}

/**
 * 构造树型结构数据
 * data 数据源
 * id id字段 默认 'id'
 * parentId 父节点字段 默认 'parentId'
 * children 孩子节点字段 默认 'children'
 */
const handleTree = (data, id, parentId, children) => {
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children'
	};

	var childrenListMap = {};
	var nodeIds = {};
	var tree = [];

	for (let d of data) {
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]];
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}


export {
	toast,
	modal,
	inArray,
	random,
	countDown,
	getFormatTime,
	transformTime,
	setStorageSync,
	getStorageSync,
	remove,
	queryParam,
	isOpenType,
	domiRouter,
	handleTree
}
