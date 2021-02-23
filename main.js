import Vue from 'vue'
import App from './App'
import api from './api'
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$imageurl = "https://yundongke.gzbigbang.cn/"
Vue.prototype.image = "https://yundongke.gzbigbang.cn"
Vue.prototype.$uploadUrl = 'https://i.huatisport.com';
Vue.prototype.$upload = 'https://d.huatisport.com';
Vue.prototype.$api = api;
Vue.prototype.prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}



// main.js
function formatDate(date, fmt) {
    date = new Date(date);
    if (typeof(fmt) === "undefined") {
        fmt = "yyyy-MM-dd";
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt
};

//定义一个时间过滤器
Vue.filter("FormatDate", function(date, fmt) {
    return formatDate(date, fmt);
});

const app = new Vue({
    ...App
})
app.$mount()
