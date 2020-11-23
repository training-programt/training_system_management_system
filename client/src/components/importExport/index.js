import React, { useState, useImperativeHandle } from 'react'
import { Modal, Upload, message, Button } from 'antd'
import PaginationComponent from '../pagination'

import axios from '@/https'
import './index.less'

import LeftIcon from "../../public/images/back.png";
import RightIcon from '../../public/images/right-icon.png';
import Icon1 from '../../public/images/icon-1.png';
import Icon2 from '../../public/images/icon-2.png';
import SuccessPng from '../../public/images/success.png';
import WranPng from '../../public/images/wran.png';
import { getSession } from '../../utils'


const ImportExport = props => {

  const { cRef, uploadUrl, downloadUrl, historyUrl, uploadData, downloadTitle } = props;

  const [visible, setVisible] = useState(false);
  const [process, setProcess] = useState(1);
  const [page, setPage] = useState(1);

  useImperativeHandle(cRef, () => ({
    showModal: value => setVisible(value),
  }))

  const uploadProps = {
    name: 'file',
    accept: '.xls, .xlsx',
    action: axios.defaults.baseURL + uploadUrl,
    headers: {
      authorization: getSession('token'),
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setProcess(2);
        console.log(info.file)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        setProcess(3);
        message.error(`${info.file.name} file upload failed.`);
      }

      setTimeout(() => {

      })
    },
  };

  const download = () => {
    console.log('download ...');
  }

  const pageparams = {
    total: 100,
    pageSize: 10,
    page: page,
  }

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
        {(() => {
          switch (process) {
            case 1: return (
              <div className="body-container">
                <div className="line"></div>
                <div className="history">
                  <span onClick={() => setProcess(4)}>查看历史记录</span>
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
                  <Upload {...uploadProps}>
                    <Button className="btn">上传文件</Button>
                  </Upload>
                </div>
              </div>
            )
            case 2: return (
              <div className="upload-result success-result">
                <div className="result-title">
                  <img src={SuccessPng} alt="success" />
                  <span>导入成功</span>
                </div>
                <div className="result-text">
                  <p>一共上传6条记录，全部成功</p>
                </div>
                <div className="again-btn" onClick={() => setProcess(1)}>再次上传</div>
              </div>
            )
            case 3: return (
              <div className="upload-result">
                <div className="result-title">
                  <img src={WranPng} alt="wran" />
                  <span>导入成功4条，失败2条</span>
                </div>
                <div className="result-text">
                  <p> 一共导入4位成员，其中 <span className="oringe">2条</span> 错误记录，</p>
                  <p>您可以下载未导入成功的成员信息表，修改后重新上传</p>
                </div>
                <div className="again-btn" onClick={() => setProcess(1)}>再次上传</div>
              </div>
            )
            case 4: return (
              <div className="history-box">
                <div className="history-list">
                  <div className="history-back" onClick={() => setProcess(1)}>
                    <img src={LeftIcon} alt="left" />
                  </div>
                </div>
                <div className="pagenation-box history-pageation">
                  <PaginationComponent pageparams={pageparams} handlePage={v => setPage(v)} />
                </div>
              </div>
            )
          }
        })()}

      </Modal>
    </>
  )
}

export default ImportExport
