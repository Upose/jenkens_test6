/*
 * @Description: 写一些公共方法挂载到vue原型上
 * @Author: wanjikun
 * @Date: 2022-04-24 09:52:57
 */
import Vue from 'vue'
import http from './http';
import store from '../../../router/store'

/**
 *高亮
 */
function hightLightShow(message, highlightToken) {
  if (highlightToken == null) return message;
  if (!message) return message;
  let highlightTokens = Array.from(
    new Set(
      highlightToken
        .split(";")
        .map((z) => z.toLowerCase())
        .filter(
          (z) =>
            "<i  style='color:red;font-style: inherit;'>".indexOf(
              z
            ) == -1
        )
        .sort((a, b) => b.length - a.length)
    )
  );

  for (let index = 0; index < highlightTokens.length; index++) {
    const element = highlightTokens[index];
    message = message.replace(
      new RegExp(`(${element})`, "ig"),
      "<i  style='color:red;font-style: inherit;'>$1</i>"
    );
  }
  return message;
}

//深拷贝
function deepClone(obj) {
  //定义一个变量 并判断是数组还是对象
  var objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object" && obj != null) {
    // 判断obj存在并且是对象类型的时候 因为null也是object类型，所以要单独做判断
    for (var key in obj) {  // 循环对象类型的obj
      if (obj.hasOwnProperty(key)) {  // 判断obj中是否存在key属性
        if (obj[key] && typeof obj[key] === "object") {  //  判断如果obj[key]存在并且obj[key]是对象类型的时候应该深拷贝，即在堆内存中开辟新的内存
          objClone[key] = deepClone(obj[key]);
        } else {  //  否则就是浅复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

// 引入公共模板
function importPublicTemplate(url) {
  // 已经引入不需要再引
  let cssDom = document.getElementById(url + '/component.css');
  let jsDom = document.getElementById(url + '/component.js');
  if (cssDom && jsDom) {
    // cssDom.parentNode.removeChild(cssDom);
    // jsDom.parentNode.removeChild(jsDom);
    return
  }
  // css
  let link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", url + '/component.css?v=' + new Date().getTime());//增加时间戳参数 保证用的最新
  link.setAttribute("id", url + '/component.css');
  document.getElementsByTagName("body")[0].appendChild(link);
  // js
  let js_element = document.createElement("script");
  js_element.setAttribute("type", "text/javascript");
  js_element.setAttribute("src", url + '/component.js?v=' + new Date().getTime());//增加时间戳参数 保证用的最新
  js_element.setAttribute("id", url + '/component.js');
  document.getElementsByTagName("body")[0].appendChild(js_element);
}

/**注入link标签 */
function addStyle(url) {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", url + '?version=' + new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}
/**注入script标签 */
function addScript(url) {
  var js_element = document.createElement("script");
  js_element.setAttribute("type", "text/javascript");
  js_element.setAttribute("src", url + '?version=' + new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(js_element);
}


/** 
 * 权限指令,对按钮权限的控制
 * 使用v-has="'权限名（permission）'"进行控制
 * permission 单个权限控制传入字符串 多个或关系传入数组
 **/
Vue.directive("has", {
  inserted: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      // el.style.display = "none";
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
});
// 权限检查方法（且把该方法添加到vue原型中）
Vue.prototype.$_has = (value) => {
  let isExist = false;
  // 获取到权限数组
  var buttonpermsStr = store.state.authList;
  if (buttonpermsStr === undefined || buttonpermsStr == null) {
    return false;
  }
  // 单权限判断
  if (typeof value === "string") {
    // 若在按钮中定义的权限字段能在后端返回的权限数组中能找到，则该按钮可显示
    isExist = buttonpermsStr.indexOf(value) > -1 ? true : false;
  } else {
    // 多权限判断
    let list = buttonpermsStr.filter((item) => value.includes(item));
    isExist = list.length ? true : false;
  }
  return isExist;
};


/**
 * 通过名称获取枚举列表
 * neet:枚举名列表
*/
function getEnumInfo(neet) {
  const that = this;
  neet.forEach(key => {
    http.getJson('type', {}, key).then(res => {
      that[key] = res.data.map(item => {
        return {
          label: item.dictLabel,
          value: item.dictValue
        }
      });
    }).catch(err => {
      Vue.prototype.$message({ type: 'error', message: '获取枚举信息失败!' });
    })
  })
}

/**
 * 键值对匹配
 * list:枚举列表
 * value:需匹配的值
 * 返回键名
 **/
function matchKeyValue(list, value) {
  if (!list || !list.length) return '';
  const ele = list.find(item => item.value == value);
  return ele ? ele.label : '';
}

/*
 * 格式化时间
 * timestamp：日期
 * format: 格式
 * 返回格式化后的时间
 */
function timeFormat(timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
  if (!timestamp) {
    return '';
  }
  let date = new Date(timestamp);
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份 "d+": value.getDate(), // 日
    'd+': date.getDate(),
    'h+': date.getHours(), // 小时 "m+": value.getMinutes(), // 分 "s+": value.getSeconds(), // 秒
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return format;
}

function onlineStatusClass(Status) {
  let styleClass = 'font-primary';
  switch (Status) {
    case 1:
      styleClass = 'font-green';
      break;
    case 0:
      styleClass = 'font-danger';
      break;
    default:
      styleClass = 'font-primary';
      break;
  }
  return styleClass;
}

/*
 * 根据某个属性去重数组
 * list：原数组
 * attr: 属性
 * 返回去重后的数组
 */
function removalByAttribute(list, attr) {
  let obj = {};
  let newlist = list.reduce(function (item, next) {
    obj[next[attr]] ? "" : (obj[next[attr]] = true && item.push(next));
    return item;
  }, []);
  return newlist || [];
}


/*
 * 整数三位一分隔
 * val：数字
 * 返回去重后的数组
 */
function filterNum(val) {
  if (!val) {
    return 0;
  }
  val = '' + val // 转换成字符串
  let int = val
  int = int.split('').reverse().join('') // 翻转整数
  let temp = '' // 临时变量
  for (let i = 0; i < int.length; i++) {
    temp += int[i]
    if ((i + 1) % 3 === 0 && i !== int.length - 1) {
      temp += ',' // 每隔三个数字拼接一个逗号
    }
  }
  temp = temp.split('').reverse().join('') // 加完逗号之后翻转
  return temp; // 返回
}

/*
 * 过滤检索条件
 * query：检索条件
 * 返回有值的条件
 */
function filterQuery(query) {
  if (!query) {
    return {};
  }
  let newQuery = {};
 for (let key in query) {
    if (query[key] || typeof query[key] === 'boolean') {
      newQuery[key] = query[key];
    }
  }
  return newQuery;
}

Vue.prototype.$hightLightShow = hightLightShow;
Vue.prototype.$deepCloneObj = deepClone;
Vue.prototype.$importPublicTemplate = importPublicTemplate;
Vue.prototype.$http = http;
Vue.prototype.http = http;
Vue.prototype.$addStyle = addStyle;
Vue.prototype.$addScript = addScript;
Vue.prototype.$getEnumInfo = getEnumInfo;
Vue.prototype.$matchKeyValue = matchKeyValue;
Vue.prototype.$timeFormat = timeFormat;
Vue.prototype.$onlineStatusClass = onlineStatusClass;
Vue.prototype.$removalByAttribute = removalByAttribute;
Vue.prototype.$filterNum = filterNum;
Vue.prototype.$filterQuery = filterQuery;