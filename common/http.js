import App from '@/App';
import config from '@/common/config.js';

const http = ({
	url = '',
	param = {},
	...other
} = {}) => {
	let timeStart = Date.now();
	let Token =uni.getStorageSync('Token') || "";
	return new Promise((resolve, reject) => {
		wx.request({
			url: getUrl(url),
			data: param,
			header: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization':  Token,
				// #ifdef MP-WEIXIN
					'Isminiapp': 'TRUE', 
				// #endif
			},
			...other,
			complete: res => {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res);
				} else {
					reject(res);
					if (res.statusCode == 401) {
						uni.hideLoading()
					} else if (res.statusCode == 500) {
						uni.showModal({
							title: '提示',
							content: 'Network error, please try again later',
							confirmText: "confirm",
							showCancel: false,
						})
						uni.hideLoading()
					}
				}
			}
		});
	});
};

const getUrl = url => {
	if (url.indexOf('://') == -1) {
		url = config.baseUrl + url;
	}
	return url;
}; // get方法


const _get = (url, param = {}) => {
	return http({
		url,
		param
	});
};

const _post = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'post'
	});
};

const _put = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	});
};

const _delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'delete'
	});
};


const uploadFile = ({
	url = '',
	filePath,
	formData = {},
	name
} = {}) => {
	return new Promise((resolve, reject) => {
		var uploadTask = uni.uploadFile({
			url: getUrl(url),
			filePath: filePath,
			name: name,
			header: {},
			formData: formData,
			success: res => {
				console.log('上传接口数据', res);
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail: (err) => {
				reject(err);
				console.log(err);
			}
		});

		uploadTask.onProgressUpdate((res) => {
			console.log(res);
		});

	});
}; // 上传文件


const upload = (url, filePath, formData = {}, name) => {
	return uploadFile({
		url,
		filePath,
		formData,
		name
	});
};

module.exports = {
	_get,
	_post,
	_put,
	_delete,
	upload,
};
