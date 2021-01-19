import {authLogin} from "../api/login";

export const login = () => {
    let that = this;
    wx.login({
        success: (res) => {
            if (res.code) {
                authLogin(res.code)
                    .then(res => {
                        if (res.data.code === 0) {
                            wx.setStorageSync('token', res.data.data.sessionid);
                            console.log(res.data.data);
                        } else {
                            wx.showModal({
                                title: res.data.data.message,
                                showCancel: false
                            });
                        }
                    }).catch(err => console.log(err))
            }
        }
    })
}