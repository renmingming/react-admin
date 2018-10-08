import React from 'react'
import { Table } from 'antd'

export default class ETable extends React.Component{
    state = {}
    onRowClick = (record, index) => {
        let selectedRowKeys = [index];
        this.props.updateSelectedItem(record, selectedRowKeys)
    }
    render() {
        const {selectedRowKeys} = this.props;
        let rowSelection = {
            type: 'radio',
            selectedRowKeys,
        }
        return (
            <Table
                bordered
                rowSelection={rowSelection}
                {...this.props}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index)
                        }
                    }
                }}
            ></Table>
        )
    }
}