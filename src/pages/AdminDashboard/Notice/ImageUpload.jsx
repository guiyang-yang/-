import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, {memo, useState} from 'react';
import request from 'umi-request';


 function  getBase64  (img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
 
}




const ImageUpload = ({getImageName,avatar}) => {
  const [imgUrl,setImgUrl] = useState(avatar)
  const [loading, setLoading] = useState(false)

  const handleRequest=  ({file}) =>{
    const data = new FormData()
    data.append('file',file)
    data.append('key','file')

    
    request(`/ResSystem/food/upload_food_pic`, {
      method:'POST',
      data
    })
    .then( async res=>{
      if(res.code==='200'){
        getImageName(res.body)
        getBase64(file,imageUrl =>{
          setImgUrl(imageUrl)
           setLoading(false)
        }
     );
        message.success('图片上传成功')
      }else{
        message.error('图片上传失败')
      }
    })

  }


  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
     
      getBase64(info.file.originFileObj, imageUrl =>{
           setImgUrl(imageUrl)
            setLoading(false)
         }
      );
    }
     else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
    
  };

  const props = {
    name:"file",
    listType:"picture-card",
    className:"avatar-uploader",
    showUploadList:false,
    onChange:handleChange,
    customRequest:handleRequest
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload  {...props}>
      {imgUrl ?
        <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
      : uploadButton}
    </Upload>
  );
};

export default memo(ImageUpload);
