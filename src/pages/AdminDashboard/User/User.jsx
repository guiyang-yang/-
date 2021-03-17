import React, { Component } from 'react'
import {Card,Space,Button,Tooltip,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import { PlusOutlined} from '@ant-design/icons'
import {getUserInfo,EditUser,AddUser,RemoveUser} from './service'
import GlobalForm from './GlobalForm'

class User extends Component {
    Usercolumns = [
        {
          title: '用户名',
          dataIndex: 'username',
          key:'username',
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key:'gender'
    },
        {
            title: '联系方式',
            dataIndex: 'pnumber',
            key:'pnumber',
            search:false
          },
          {
            title: '生日',
            dataIndex: 'birthday',
            key:'birthday',
            valueType: 'dateTime',
            search:false
          },
          {
            title: '注册时间',
            dataIndex: 'regtime',
            valueType: 'dateTime',
            key:'regtime',
            search:false,
            sorter: (a, b) => moment(a.regtime )- moment(b.regtime),
          },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
            <>             
             <Button type='link' onClick={()=>this.showEditModal(record)}>编辑</Button>          
             <Button type='link' style={{marginLeft:20}} onClick={()=>this.deleteUserInfo(record.userid)} >删除</Button>
             </>
          )
        }
    ]
    constructor(props){
        super(props);
        this.state={
          title:'新建',
          visible:false
        }
    }
    UserActionRef = React.createRef();

    deleteUserInfo= async(id)=>{
      const result = await RemoveUser({userid:id})
      if(result.code === 200){
        Message.success(result.message)
        this.UserActionRef.current.reloadAndRest()
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
    showEditModal=(record)=>{
      this.setState(pre=>{
        const result = {...pre}
        result.visible = true
        result.record = record
        result.title = '编辑'
        return result 
      })
    }

    closeModal=()=>{
      this.setState({
        visible:false
      })
    }

    submit=async(values,title)=>{ 
      if(title==='新建')    
      {
        const result = await AddUser(values)
      if(result.code === 200){
        this.setState({
          visible:false
        },()=>{
          Message.success(result.message)
          this.UserActionRef.current.reloadAndRest()
        })      
      }
      else{
        Message.error(result.message)
      }
    }
      else{
        const result = await EditUser(values)
        if(result.code === 200){
          this.setState({
            visible:false
          },()=>{
            Message.success(result.message)
            this.UserActionRef.current.reloadAndRest()
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
                  添加用户
                  </Button></Space>}
                     rowKey="userid"
                     actionRef={this.UserActionRef}
                     columns={this.Usercolumns}
                     request={async params =>{
                       const newparams={}
                       if(params.username){
                        newparams.username=params.username
                       }
                       if(params.gender){
                        newparams.gender=params.gender
                       }
                       const result = await getUserInfo(newparams)
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
                       {visible?<GlobalForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null}
            </Card>
        )
    }
}

export default User