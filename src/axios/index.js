import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from '../utils/utils.js'

export default class Axios{
    static requestList(_this, url, params) {
        let data = {
            params
        }
        this.ajax({
            url,
            data
        }).then((data) => {
            if(data && data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }
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
        let loading,baseApi;
        if(options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        if(options.isMock) {
            // mock数据地址
            baseApi = 'https://www.easy-mock.com/mock/5bab71e33567340cc7d3dc66/rmmapi';
        }else{
            // 真实数据地址
            baseApi = 'https://www.easy-mock.com/mock/5bab71e33567340cc7d3dc66/rmmapi';
        }
        return new Promise((resovle, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 15000, // 15s超时
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