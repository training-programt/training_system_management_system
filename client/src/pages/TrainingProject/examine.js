import React from 'react'
import FileViewer from 'react-file-viewer';
import './index.less'

const type = 'docx'
const file = 'http://qmly29cs3.hd-bkt.clouddn.com/test.docx'


const Examine = () => {
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

export default Examine  
