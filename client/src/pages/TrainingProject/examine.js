import React, { useState, useMemo } from 'react'
import { Select, Button, message } from 'antd';
// import FileViewer from 'react-file-viewer';
import api from '@/apis/trainingProject'
import './index.less'
import { useHistory } from 'react-router-dom';

const type = 'docx'
// const file = 'http://qpe0365ci.hd-bkt.clouddn.com/2019级软件工程人才培养方案说明.docx'

const Examine = (props) => {
  const history = useHistory();
  const [teacherList, setTeacherList] = useState([])
  const [acTeacher, setAcTeacher] = useState('')

  const getTeacherList = async () => {
    const res = await React.$axios.post(api.getLeaderList)
    if (res && res.isSucceed) {
      setTeacherList(res.data)
    }
  }

  useMemo(() => {
    if(props.approver) {
      setAcTeacher(props.approver);
    }
    getTeacherList()
  }, [])

  const handleSelect = (val) => {
    setAcTeacher(val)
  }

  const finallyProject = async () => {
    const params = {
      state: 1,
      approver: acTeacher,
      _id: props.project,
    }
    const res = await React.$axios.post(api.updateProject, params)
    if(res && res.isSucceed) {
      message.success('编辑成功')
      history.replace('/trainingProject')
    }
  }

  return (
    <div className="examine-wrap">
      <div className="header-box">
        <div className="file-watch">文件预览</div>
        <div>
          <span>选择审核人员：</span>
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="选择审核人员"
            onSelect={handleSelect}
            value={acTeacher}
          >
            {
              teacherList.map((item, index) => <Select.Option key={index} value={item._id}>{item.name}</Select.Option>)
            }
          </Select>
          <Button type="primary" onClick={finallyProject}>提交审批</Button>
        </div>
      </div>

      <div className="content-box">
        {/* <FileViewer
          style={{ width: '100%' }}
          fileType={type}
          filePath={file}
        /> */}
      </div>
    </div>
  );
}

export default Examine
