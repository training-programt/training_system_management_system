import React, { useState, useMemo } from 'react'
import { Select, Button, message } from 'antd';
// import FileViewer from 'react-file-viewer';
import api from '@/apis/trainingProject'
import './index.less'
import { useHistory } from 'react-router-dom';

// const type = 'docx'
// const file = 'http://qpe0365ci.hd-bkt.clouddn.com/2019级软件工程人才培养方案说明.docx'

const Examine = (props) => {
  const history = useHistory();
  const [teacherList, setTeacherList] = useState([])
  const [acTeacher, setAcTeacher] = useState('')
  const [projectDetail, setProjectDetail] = useState({})

  const getTeacherList = async () => {
    const res = await React.$axios.post(api.getLeaderList)
    if (res && res.isSucceed) {
      setTeacherList(res.data)
    }
  }

  const getProjectDetail = async () => {
    const params = {
      _id: props.project
    }
    const res = await React.$axios.post(api.getProjectDetails, params)
    if (res && res.isSucceed) {
      setProjectDetail(res.data)
      setAcTeacher(res.data.approver ? res.data.approver._id : '')
    }
  }

  useMemo(() => {
    if (props.project) {
      getProjectDetail();
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
    if (res && res.isSucceed) {
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
        <div className='header-wrap'>
          <h2>{projectDetail.name ? projectDetail.name : ''}</h2>
        </div>

        {
          projectDetail.trainingObjective ? (
            <div className='content-item'>
              <div className='item-title'>培养目标</div>
              <p>{projectDetail.trainingObjective.professional_training_objectives}</p>
              <p>毕业后5年左右，毕业生应能达到以下目标：</p>
              {
                projectDetail.trainingObjective.specific_training_objectives.map((item, index) => {
                  return <p key={item._id}>{index + 1}、{item.description}</p>
                })
              }
            </div>
          ) : ''
        }
        {
          projectDetail.graduationRequirement ? (
            <div className='content-item'>
              <div className='item-title'>毕业要求</div>
              <p>{projectDetail.graduationRequirement.description}</p>
              <p>毕业时学生应达到以下{projectDetail.graduationRequirement.majorRequirement.length}个基本要求</p>
              {
                projectDetail.graduationRequirement.majorRequirement.map((item, index) => {
                  return <div key={item._id}>{index + 1}、{item.name}：{item.description}</div>
                })
              }
            </div>
          ) : ''
        }
        <div className='content-item'>
          <div className='item-title'>学制与学位</div>
          <div>学制：{projectDetail.system}年</div>
          <div>学制：{projectDetail.degree}</div>
        </div>
        <div className='content-item'>
          <div className='item-title'>主干学科与主要课程</div>
          <div><strong>主干学科：</strong>{projectDetail.core_disciplines}</div>
          <div><strong>专业核心课程：</strong>{projectDetail.core_curriculum}</div>
          <div><strong>主要实践性教学环节：</strong>{projectDetail.practical_teaching_link}</div>
        </div>
        {
          projectDetail.credits_required ? (
            <div className='content-item'>
              <div className='item-title'>毕业学分要求</div>
              <div className='item-box'>
                <div>本专业学生必须修满培养方案规定的课程（环节）165学分和素质拓展15学分（免费）方能毕业。</div>
                <table border='1px'>
                  <thead>
                    <tr>
                      <th rowSpan='2'>序号</th>
                      <th rowSpan='2'>课程类型</th>
                      <th colSpan='2'>学分及比例</th>
                    </tr>
                    <tr>
                      <th>合计</th>
                      <th>所占比例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      projectDetail.credits_required.content.map((item, index) => {
                        return (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.courseType}</td>
                            <td>{item.credit}</td>
                            <td>{item.ratio}%</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                <div><strong>注：</strong>{projectDetail.credits_required.description}</div>
              </div>
            </div>

          ) : ''
        }
        {
          projectDetail.majorObjReqRelation ? (
            <div></div>
          ) : ''
        }
      </div>
    </div>
  );
}

export default Examine
