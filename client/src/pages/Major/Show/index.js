import React from 'react';
import { Table, Tag, Space,Column } from 'antd';

const MajorShow = () => {
    const data = [
        {
            professional_id: '1',
            professional_code: '03211171',
            professional_name: '软件工程',
            professional_introduce: "红红火火恍恍惚惚",
            professional_count: '181',
        },
        {
            professional_id: '2',
            professional_code: '03211172',
            professional_name: '计算机科学与技术',
            professional_introduce: "红红火火恍恍惚惚",
            professional_count: '80',
        },
    ];
    return (
        <Table dataSource={data}>
            <Column title="专业id" dataIndex="professional_id" key="professional_id" />
            <Column title="专业编码号" dataIndex="professional_code" key="professional_code" />
            <Column title="专业名字" dataIndex="professional_name" key="professional_name" />
            <Column title="专业介绍" dataIndex="professional_introduce" key="professional_introduce" />
            <Column title="专业学生人数" dataIndex="professional_count" key="professional_count" />
        </Table>
    )
}

export default MajorShow;