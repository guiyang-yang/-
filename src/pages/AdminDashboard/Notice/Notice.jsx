import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import {DeleteNoticeInfo,getNoticeInfo,newNoticeInfo,editNoticeInfo,DownLoadNotice} from './service'
import { PlusOutlined,DownloadOutlined} from '@ant-design/icons'
import NoticeForm from './NoticeForm'

class Notice extends Component {

    Noticecolumns = [
      {
        title: '销售号',
        dataIndex: 'sale_id',
        key:'sale_id',
        search: false,
      },
        {
          title: '销售标题',
          dataIndex: 'sale_title',
          key:'sale_title',
        },
          {
          title: '销售内容',
          dataIndex: 'sale_content',
          key:'sale_content',
          search: false,
        },
        {
          title: '销售图片',
          dataIndex: 'sale_pic',
          key: 'sale_pic',
          valueType: 'image',
          search: false,
        },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
             <>
             <Button type='link' onClick={()=>this.showEditModal(record)}>编辑</Button>
              <Popconfirm
                  title="确定删除吗"
                  onConfirm={()=>this.deleteNoticeInfo(record.sale_id)}
                  okText="确定"
                  cancelText="取消"
                >
               <Button type='link' style={{marginLeft:20}}>删除</Button>
               </Popconfirm>
             </> 
          )
        }
    ]

    

    constructor(props){
        super(props);
        this.state={
          visible:false,
          title:'新建'
        }
    }

    NoticeActionRef = React.createRef();

    async componentDidMount(){

  }



  deleteNoticeInfo= async noticeId=>{
    const result = await DeleteNoticeInfo({sale_id:noticeId})
    if(result.code === 200){
      Message.success(result.message)
      this.NoticeActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }
 
  showModal=()=>{
    this.setState({
      visible:true,
      title:'新建'
    })
  }
  closeModal=()=>{
    this.setState({
      visible:false
    })
  }


  showEditModal=(record)=>{
    this.setState(pre=>{
      const result = {...pre}
      result.visible = true
      result.record = record
      result.title = '编辑'
      return result 
    })
  }

  submit=async(values,title)=>{ 
    if(title==='新建')    
    {
      const result = await newNoticeInfo(values)
    if(result.code === 200){
      this.setState({
        visible:false
      },()=>{
        Message.success(result.message)
        this.NoticeActionRef.current.reloadAndRest()
      })      
    }
    else{
      Message.error(result.message)
    }
  }
    else{
      const result = await editNoticeInfo(values)
      if(result.code === 200){
        this.setState({
          visible:false
        },()=>{
          Message.success(result.message)
          this.NoticeActionRef.current.reloadAndRest()
        })      
      }
      else{
        Message.error(result.message)
      }
    }
  }

  exportXls = async ()=>{
    const data = await DownLoadNotice({})
    this.getOutExcel('销售公告信息.xlsx',data)
  }

  getOutExcel= (fileName, res)=> {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      if (window.navigator.msSaveOrOpenBlob) {
          // 兼容 IE & EDGE
          navigator.msSaveBlob(blob, fileName);
      } else {
          const link = document.createElement('a');
          // 兼容不同浏览器的URL对象
          const url = window.URL || window.webkitURL || window.moxURL
          // 创建下载链接
          link.href = url.createObjectURL(blob);
          // 命名下载名称
          link.download = fileName;
          // 点击触发下载
          link.click();
          // 下载完成进行释放
          url.revokeObjectURL(link.href);
      }
  }
 


    render() {
        const {visible} = this.state
        return (
            <Card>
                <ProTable  
                 headerTitle={
                    <Space>
                    <Button icon={<PlusOutlined />}
                      type='primary' 
                      style={{marginRight:'10px'}}
                      onClick={this.showModal}
                    >
                     添加销售公告
                    </Button>
                    <Button
              type='primary' onClick={this.exportXls} icon={<DownloadOutlined />}
            >
              下载销售公告信息
            </Button></Space>}
                     rowKey="notice_id"
                     actionRef={this.NoticeActionRef}
                     columns={this.Noticecolumns}
  
                     request={async params =>{
                      const newParams={}
                      if(params.sale_title){
                        newParams.sale_title=params.sale_title
                    }
                    const result = await getNoticeInfo(newParams)
                       if(result.length){
                        return{
                          data:result,
                          success:true,
                          total:0,
                          page:0,
                          pageSize:10
                      }
                       }
                         return{
                             data:[],
                             success:true,
                             total:0,
                             page:0,
                             pageSize:10
                         }}}
                         pagination={{
                           pageSize: 10,
                         }}
                       />
                       {visible?<NoticeForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null}
            </Card>
        )
    }
}



export default Notice;