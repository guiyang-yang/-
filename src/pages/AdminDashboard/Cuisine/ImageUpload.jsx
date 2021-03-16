import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, {memo, useEffect, useState} from 'react';
import { getFileAccessHttpUrl } from './utils';

// 获取头像地址url
function getAvatarView(fileList) {
  if (fileList.length > 0) {
    const { url } = fileList[0];
    return getFileAccessHttpUrl(url);
  }
  return '';
}
// 截取文件名
function getFileName(url){
  let path = url
  if(path.lastIndexOf("\\")>=0){
    const reg=new RegExp("\\\\","g");
    path = path.replace(reg,"/");
  }
  return path.substring(path.lastIndexOf("/")+1);
}

// 把url格式化成upload组件filelist参数格式
function initFileList(paths){
  const fileList = []
  if(!paths || paths.length===0){
    return fileList;
  }
  const arr = paths.split(",")
  arr.forEach(item => {
    const url = getFileAccessHttpUrl(item);
    fileList.push({
      url,
      uid: `-${parseInt(Math.random()*10000+1,10)}`,
      name: getFileName(item),
      status: 'done',
      response:{
        status:"history",
        message:item
      }
    })
  });
  return fileList
}
// 需要传给后台的额外数据
const uploadData = { key: 'file' }

const ImageUpload = ({ value = "", onChange }) => {
  const [fileList, updateFileList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    updateFileList(initFileList(value))
  }, [value]);

  const handlePathChange = uploadFiles => {
    let path = '';
    if (!uploadFiles || uploadFiles.length === 0) {
      path = '';
    }
    const arr = [];
    arr.push(uploadFiles[uploadFiles.length - 1].response.message);
    if (arr.length > 0) {
      path = arr.join(',');
    }
    setLoading(false)
    updateFileList(uploadFiles)
    onChange(path)
  };
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    let files = info.fileList;
    if (info.file.status === 'done') {
      if (info.file.response.success) {
        files = files.map(file => {
          const cloneFile = {...file}
          if (cloneFile.response) {
            cloneFile.url = file.response.message;
          }
          return cloneFile;
        });
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
    if (info.file.status === 'done') {
      handlePathChange(files);
    }
  };

  const props = {
    fileList,
    name:"file",
    listType:"picture-card",
    className:"avatar-uploader",
    data:uploadData,
    showUploadList:false,
    onChange:handleChange,
    action:`${window.location.origin}/food/upload_food_pic`,
    // headers:{ 'X-Access-Token': ls.get(ACCESS_TOKEN) }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload {...props}>
      {fileList.length >= 1 ?
        <img src={getAvatarView(fileList)} alt="avatar" style={{ width: '100%' }} />
      : uploadButton}
    </Upload>
  );
};

export default memo(ImageUpload);
