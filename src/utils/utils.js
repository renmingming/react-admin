import React from 'react'
import { Select } from "antd";
const Option = Select.Option;

export default {
    formteDate(time) {
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    pagination(data, callback) {
        let page = {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`
            },
            showQuickJumper: true // 输入跳转
        }
        return page
    },
    getOptionList(data) {
        if(!data) {
            return []
        }
        let options = [<Option value="0" key="all_key"></Option>];
        data.map((item) => {
            return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    }
}