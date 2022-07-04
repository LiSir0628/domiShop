// 主要接口地址
let baseUrl = 'https://wsc.fjgdwl.com'
// sdk
let sdkUrl = 'https://wsc.fjgdwl.com'
// wss
let wssUrl = 'https://wsc.fjgdwl.com'
// 聊天地址
let chatUrl = ''
// 外部资源地址
let sourceUrl = ''
// php中间件地址
let phpUrl = ''


// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
	baseUrl = 'https://wsc.fjgdwl.com'
	chatUrl = ''
	sourceUrl = ''
	phpUrl = ''
} else if (process.env.NODE_ENV === 'development') {
	baseUrl = 'https://wsc.fjgdwl.com'
	chatUrl = ''
	sourceUrl = ''
	phpUrl = ''
}


export default {
	baseUrl,
	sdkUrl,
	wssUrl,
	chatUrl,
	sourceUrl,
	phpUrl
}

