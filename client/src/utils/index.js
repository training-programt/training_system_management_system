
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