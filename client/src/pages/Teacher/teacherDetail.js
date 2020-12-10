import React, { useState, useImperativeHandle, useMemo } from 'react'
import { Drawer, Row, Col, Divider, Spin } from "antd";

import api from '../../apis/teacher'

const TeacherDetail = (props) => {

  const { cRef, teacherDetail } = props;
  const [visible, setVisible] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  useImperativeHandle(cRef, () => ({
    showDetail: value => setVisible(value),
  }))

  useMemo(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await api.getTeacherDetail(teacherDetail.id);
      if (res && res.isSucceed) {
        setDetailData(res.data)
      }
      setIsLoading(false);
    }
    fetchData();
  }, [teacherDetail.id])

  return (
    <Drawer
      title={teacherDetail.name + ' —— 详细信息'}
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      width={600}
      destroyOnClose
    >
      {
        isLoading
          ? <div className="loading"><Spin tip="Loading..."/></div>
          : (
            <div className="teacher-detail">
              <p className="site-description-item-profile-p">个人信息</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="全名" content={detailData.name} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="职工编号" content={detailData.id} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="性别" content={detailData.sex} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="名族" content={detailData.nature} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="出生年月" content={detailData.birthday} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="联系方式" content={detailData.tel} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="简介"
                    content={detailData.introduction}
                  />
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">学历信息</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="专业技术职务" content={detailData.position} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="专职/兼职" content={detailData.job} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="最后毕业学校"
                    content={detailData.graduateSchool}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="最后学历" content={detailData.education} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="最后毕业专业" content={detailData.speciality} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="研究领域"
                    content={detailData.researchDirection}
                  />
                </Col>
              </Row>

              <Divider />
              <p className="site-description-item-profile-p">教学信息</p>
              <Row>
                <Col span={24}>
                  <DescriptionItem title="所属教研室" content={detailData.belongs} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="拟授课程"
                    content={detailData.course}
                  />
                </Col>
              </Row>
            </div>
          )
      }
    </Drawer>

  )
}

export default TeacherDetail
