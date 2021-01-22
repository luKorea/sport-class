// 日期格式话
export const getDate = (type) => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (type === 'start') {
        year = year - 60;
    } else if (type === 'end') {
        year = year + 2;
    }
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    return `${year}-${month}-${day}`;
}


export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 处理数字
export function NumberFormat(number) {
    return Number(number) / 100
}

// 重定向到首页
export const redirectPage = () => {
    wx.clearStorageSync();
    wx.redirectTo({
        url: '/pages/login/login'
    })
}

// 格式化Format
export const formData = (obj = {}) => {
    let result = ''
    for (let name of Object.keys(obj)) {
        let value = obj[name];
        result += '\r\n--XXX' + '\r\nContent-Disposition: form-data; name=\"'+ name +'\"'+ '\r\n' + '\r\n' + value
    }
    return result + '\r\n--XXX--'
}