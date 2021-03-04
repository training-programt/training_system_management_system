import React from 'react'
import FileViewer from 'react-file-viewer';

const type = 'docx'
const file = 'http://qpe0365ci.hd-bkt.clouddn.com/工程认证教学大纲示例.docx'

const ExamAndApp = () => {
  return (
    <div className="examine-wrap">
      <div className="file-watch">文件预览</div>
      <div style={{padding: '10px'}}>
        <FileViewer
          style={{ width: '100%' }}
          fileType={type}
          filePath={file}
        />
      </div>
      <div>选择审核人员</div>
    </div>
  );
}

export default ExamAndApp  
