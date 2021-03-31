import React, { useState, useEffect } from 'react'
import { Button, List, Card, Divider, message } from 'antd';
import { useLocation } from "react-router-dom";
import { SaveOutlined } from '@ant-design/icons';
const Book = () => {
    const [leftList, setLeftList] = useState([]);
    const [rightTest, setRightTestData] = useState([]);
    let book = JSON.parse(localStorage.getItem('bookList'));
    let info = useLocation()?.state?.data;
    useEffect(() => {
        const res = React.$axios.get('/getBook').then((testData) => {
            setRightTestData(testData.data)
        })
    }, [])

    const useListItem = (item) => {
        setLeftList([...leftList, item])
        message.success("应用成功")
        localStorage.setItem("bookList", JSON.stringify([...leftList, item]))
    }
    const del = (index) => {
        let newLeftList = [...leftList]
        newLeftList.splice(index, 1)
        setLeftList(newLeftList)
        message.success("删除成功")
        localStorage.setItem("bookList", JSON.stringify(newLeftList))
    }
    useEffect(() => {
        if (info) {
            if(book){
                setLeftList(JSON.parse(localStorage.getItem('bookList')) || [])
            }else{
                setLeftList(info.reference)
            }
        } else {
            setLeftList(JSON.parse(localStorage.getItem('bookList')) || [])
        }
    }, [])
    const save = () => {
        localStorage.setItem("bookList", JSON.stringify(leftList));
        message.info('暂存成功');
    }
    return (
        <div className="train-object">
            <div className="object-left">
                <div className="title">设置建议教材及教学参考书</div>
                <div className="content-wrap">
                    <div className="major-object">
                        <div>建议教材及教学参考书设置：</div>
                    </div>
                    <Divider>点击右侧应用添加参考文献</Divider>
                    {
                        info ? (<Button icon={<SaveOutlined />} onClick={save} type="primary">暂存修改信息</Button>) : ''
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
                                        title={'参考文献' + (index + 1)}
                                        description={'[' + (index + 1) + ']' + item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>

                </div>
            </div>
            <div className="object-right">
                <div className="title">已有参考文献</div>
                <div className="content-wrap">
                    <div className="school-object">
                        <div>参考文献</div>
                        <div>参考文献标准格式是指为了撰写论文而引用已经发表的文献的格式，根据参考资料类型可分为专著[M]，会议论文集[C]，报纸文章[N]，期刊文章[J]，学位论文[D]，报告[R]，标准[S]，专利[P]，论文集中的析出文献[A]，杂志[G]。</div>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={rightTest}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[<Button type="link" onClick={() => useListItem(item)}>应用</Button>]}
                            >
                                <List.Item.Meta
                                    title={'参考文献' + (index + 1)}
                                    description={item.name}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Book
