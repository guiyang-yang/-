import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import {DeleteNoticeInfo,getNoticeInfo,newNoticeInfo,editNoticeInfo} from './service'
import { PlusOutlined} from '@ant-design/icons'
import TableForm from './TableForm'

class Notice extends Component {

    Tablecolumns = [
      {
        title: '餐桌号',
        dataIndex: 'sale_id',
        key:'sale_id',
        search: false,
      },
        {
          title: '餐桌名',
          dataIndex: 'sale_title',
          key:'sale_title',
        },
          {
          title: '餐桌人数',
          dataIndex: 'sale_content',
          key:'sale_content',
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

    TableActionRef = React.createRef();

    async componentDidMount(){

  }



  deleteNoticeInfo= async noticeId=>{
    const result = await DeleteNoticeInfo({sale_id:noticeId})
    if(result.code === 200){
      Message.success(result.message)
      this.TableActionRef.current.reloadAndRest()
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
        this.TableActionRef.current.reloadAndRest()
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
          this.TableActionRef.current.reloadAndRest()
        })      
      }
      else{
        Message.error(result.message)
      }
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
                     添加餐桌
                    </Button></Space>}
                     rowKey="sale_id"
                     actionRef={this.TableActionRef}
                     columns={this.Tablecolumns}
  
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
                       {visible?<TableForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null}
            </Card>
        )
    }
}



export default Notice;