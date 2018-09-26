import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'

export default class Axios{
    static jsonp(option) {
        return new Promise((resolve, reject) => {
            JsonP(option.url, {
                // param: 'JSON_CALLBACK' //跨域
            }, function(err, response) {
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }
    static ajax(options) {
        let loading;
        if(options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'https://www.easy-mock.com/mock/5bab71e33567340cc7d3dc66/rmmapi';
        return new Promise((resovle, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000, // 5s超时
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if(options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status === 200) {
                    let res = response.data;
                    if(res.code === 0) {
                        resovle(res)
                    }else{
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }
}