import React, { useState, useImperativeHandle } from 'react'
import { Modal, Upload, message, Button } from 'antd'

import './index.less'


import LeftIcon from "../../public/images/back.png";
import RightIcon from '../../public/images/right-icon.png';
import Icon1 from '../../public/images/icon-1.png';
import Icon2 from '../../public/images/icon-2.png';


const ImportExport = ({ cRef }) => {

  const [visible, setVisible] = useState(false);

  useImperativeHandle(cRef, () => ({
    showModal: value => setVisible(value),
  }))

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Modal
        title="批量导入/导出"
        visible={visible}
        maskClosable={true}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        destroyOnClose={true}
      >
        {/* 上传文件 */}
        <div className="body-container">
          <div className="line"></div>
          <div className="history">
            <span>查看历史记录</span>
            <img src={RightIcon} alt="查看历史记录" />
          </div>
          <div className="button-container">
            <p>1、下载模板，填写信息</p>
            <img src={Icon1} alt="下载模板，填写信息" />
            <p>仅支持xls、xlsx格式文件备份</p>
            <div>下载模板 </div>
          </div>
          <div className="button-container">
            <p>2、上传填好的文件</p>
            <img src={Icon2} alt="上传填好的文件" />
            <p>仅支持xls、xlsx格式文件备份</p>
            <Upload {...props}>
              <Button className="btn">上传文件</Button>
            </Upload>
          </div>
        </div>

      </Modal>
    </>
  )
}

export default ImportExport
