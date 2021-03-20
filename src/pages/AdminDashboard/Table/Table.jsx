import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import {DeleteTableInfo,getTableInfo,newTableInfo,editTableInfo,DownLoadTable} from './service'
import { PlusOutlined,DownloadOutlined} from '@ant-design/icons'
import TableForm from './TableForm'

class Notice extends Component {

    Tablecolumns = [
      {
        title: '餐桌号',
        dataIndex: 'table_id',
        key:'table_id',
        search: false,
      },
        {
          title: '餐桌名',
          dataIndex: 'table_num',
          key:'table_num',
        },
          {
          title: '餐桌人数',
          dataIndex: 'table_limit',
          key:'table_limit',
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
                  onConfirm={()=>this.deleteTableInfo(record.table_id)}
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



  deleteTableInfo= async noticeId=>{
    const result = await DeleteTableInfo({table_id:noticeId})
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
      const result = await newTableInfo(values)
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
      const result = await editTableInfo(values)
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

  exportXls = async ()=>{
    const data = await DownLoadTable({})
    this.getOutExcel('餐桌信息.csv',data)
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
                     添加餐桌
                    </Button>
                    <Button
              type='primary' onClick={this.exportXls} icon={<DownloadOutlined />}
            >
              下载餐桌信息
            </Button></Space>}
                     rowKey="table_id"
                     actionRef={this.TableActionRef}
                     columns={this.Tablecolumns}
  
                     request={async params =>{
                      const newParams={}
                      if(params.table_limit){
                        newParams.table_limit=params.table_limit
                    }
                    if(params.table_num){
                        newParams.table_num=params.table_num
                    }
                    const result = await getTableInfo(newParams)
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