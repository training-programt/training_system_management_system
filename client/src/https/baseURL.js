// 开发环境
const developURL = 'http://rap2api.taobao.org/app/mock/269925/api';

// 测试环境
const testURL = '';

// 正式上线环境
const formalURL = '';

let baseURL;
let localHref = window.location.href;

// 当前运行环境
if(localHref.includes('localhost')) {
  baseURL = developURL;
} else if (localHref.includes('testURL')) {
  baseURL = testURL;
} else if (localHref.includes('formalURL')) {
  baseURL = formalURL;
} else {
  baseURL = developURL;
}

export default baseURL;