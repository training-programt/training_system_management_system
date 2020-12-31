import React, { useState } from 'react';
import { Button, message, Input } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const Import = () => {
    const initColumn = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        className: 'text-monospace',
    }, {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
    }, {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
    }];


let attendanceInfoList = [
    {
        name:"张三",
        grade:"2017级",
        department:"前端部门"

    },
    {
        name:"李四",
        grade:"2017级",
        department:"程序部门"

    }];
    const onImportExcel = file => {
        const { files } = file.target;
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, { type: 'binary' });
                // 存储获取到的数据
                let data = [];
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    // esline-disable-next-line
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // 如果只取第一张表，就取消注释这行
                    }
                }
                // 最终获取到并且格式化后的 json 数据
                message.success('上传成功！')
                console.log(data);
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                message.error('文件类型不正确！');
            }
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);
    }
    const exportExcel = (headers, data, fileName = '请假记录表.xlsx') => {
        const _headers = headers
            .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
            .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});

        const _data = data
            .map((item, i) => headers.map((key, j) => Object.assign({}, { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) })))
            // 对刚才的结果进行降维处理（二维数组变成一维数组）
            .reduce((prev, next) => prev.concat(next))
            // 转换成 worksheet 需要的结构
            .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

        // 合并 headers 和 data
        const output = Object.assign({}, _headers, _data);
        // 获取所有单元格的位置
        const outputPos = Object.keys(output);
        // 计算出范围 ,["A1",..., "H2"]
        const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

        // 构建 workbook 对象
        const wb = {
            SheetNames: ['mySheet'],
            Sheets: {
                mySheet: Object.assign(
                    {},
                    output,
                    {
                        '!ref': ref,
                        '!cols': [{ wpx: 45 }, { wpx: 100 }, { wpx: 200 }, { wpx: 80 }, { wpx: 150 }, { wpx: 100 }, { wpx: 300 }, { wpx: 300 }],
                    },
                ),
            },
        };

        // 导出 Excel
        XLSX.writeFile(wb, fileName);
    }
    return (
        <div>
            <div>
                <Button icon={<UploadOutlined />}>
                    <input type='file' accept='.xlsx, .xls' onChange={onImportExcel} />
                    <span>上传文件</span>
                </Button>
                <p>支持 .xlsx、.xls 格式的文件</p>
            </div>
            <div>
                {/* <Button icon={<DownloadOutlined />} onClick={exportExcel(initColumn, attendanceInfoList,"人员名单.xlsx")}>
                    <span>下载文件</span>
                </Button> */}
            </div>
        </div>
    )

}

export default Import