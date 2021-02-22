// 判断是否为子数组
export const isSubArray = (arr1, arr2) => {
  let flag = false;
  for (let i of arr1) {
    flag = arr2.includes(i);
  }
  return flag;
}
// 获取session
export const getSession = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}
// 设置session
export const setSession = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') content = JSON.stringify(content)
  window.sessionStorage.setItem(name, content)
}
// 删除session
export const delSession = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

// 防抖
export const _debounce = function (fn, delay) {
  var delay1 = delay || 500;
  var timer;
  return function () {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, delay1);
  };
}

//节流
export const _throttle = function (func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

// 格式化时间为 'yyyy-MM-dd hh:mm:ss'
export function dateFormat(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function isAuthenticated() {
  return getSession('Authorization');
}

export function authenticateSuccess(token) {
  setSession('Authorization', token);
}

export function logout() {
  delSession('userInfo');
  delSession('Authorization')
}

export function createColumns(firstData, rowData) {
  return [{ title: firstData, dataIndex: 'first' }, ...rowData];
}

export function createRows(firstRow, tableData) {
  const data = firstRow.map((item, index) => {
    return {
      ...tableData[index],
      first: item.first
    }
  });
  return data
}
export function mergeCells(text, data, key, index) {
  // 上一行该列数据是否一样
  if (index !== 0 && text === data[index - 1][key]) {
    return 0
  }
  let rowSpan = 1
  // 判断下一行是否相等
  for (let i = index + 1; i < data.length; i++) {
    if (text !== data[i][key]) {
      break
    }
    rowSpan++
  }
  return rowSpan
}

export function downloadFile(blob, tagFileName, fileType) {
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = tagFileName + '.' + fileType; 
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  window.URL.revokeObjectURL(href);
}