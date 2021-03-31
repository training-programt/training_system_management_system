import React, { useState, useEffect } from 'react'
import {Button, List,Card,Divider,message} from 'antd';
import { useLocation } from "react-router-dom";
import { SaveOutlined} from '@ant-design/icons';

const Assessment = () => {
    const [leftList, setLeftList] = useState([]);
    const [rightTest, setRightTestData] = useState([]);
    let assessment = JSON.parse(localStorage.getItem('leftList'));
    let info = useLocation()?.state?.data;
    useEffect(() => {
        const res = React.$axios.get('/getTestMethod').then((testData) => {
            setRightTestData(testData.data)
        })
    }, [])

    const useRequirementItem = (item) => {
        setLeftList([...leftList,item])
        message.success("应用成功")
        localStorage.setItem("leftList",JSON.stringify([...leftList,item]))
    }
    const del=(index)=>{
        let newLeftList = [...leftList]
        newLeftList.splice(index,1)
        setLeftList(newLeftList)
        message.success("删除成功")
        localStorage.setItem("leftList",JSON.stringify(newLeftList))
    }
    useEffect(() => {
        if(info){
            if(assessment){
            setLeftList(JSON.parse(localStorage.getItem('leftList'))||[])
            }else{
            setLeftList(info.assessment)
            }
        }else{
            setLeftList(JSON.parse(localStorage.getItem('leftList'))||[])
        }
    }, [])
    const save=()=>{
        localStorage.setItem("leftList",JSON.stringify(leftList));
        message.info('暂存成功');
      }
    return (
        <div className="train-object">
            <div className="object-left">
                <div className="title">设置考核评价环节</div>
                <div className="content-wrap">
                    <div className="major-object">
                        <div>考核环节设置：</div>
                        <div>考核方式：可选择闭卷、设计作品评分或上机考核。</div>
                    </div>
                    <Divider>点击右侧应用添加评价环节</Divider>
                    {
          info?(<Button icon={<SaveOutlined />} onClick={save} type="primary">暂存修改信息</Button>):''
        }
                    <Card>
                    <List
                        itemLayout="horizontal"
                        dataSource={leftList}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[<Button type="link" onClick={() => del(index)}>删除</Button>]}
                            >
                                <List.Item.Meta
                                    title={'考核评价环节'+(index + 1)}
                                    description={item.name+item.content}
                                />
                            </List.Item>
                        )}
                    />
                    </Card>
                   
                </div>
            </div>
            <div className="object-right">
                <div className="title">考核方式及要求</div>
                <div className="content-wrap">
                    <div className="school-object">
                        <div>评价环节：</div>
                        <div>课程考核内容需按照课程教学目标以及所支撑的毕业要求指标点进行考核，并在考核之前填写《攀枝花学院课程考核形式汇总表（软件工程）》，对各个课程目标的考核环节与占比进行说明，交教研室以及课程考核工作指导分委会审批执行。</div>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={rightTest}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[<Button type="link" onClick={() => useRequirementItem(item)}>应用</Button>]}
                            >
                                <List.Item.Meta
                                    title={(index + 1) + '：' + item.name}
                                    description={item.content}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Assessment
