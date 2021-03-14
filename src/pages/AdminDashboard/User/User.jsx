import React, { Component } from 'react'
import {Card,Space,Button,Tooltip,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import { PlusOutlined} from '@ant-design/icons'
import {getUserInfo,opertionBlack} from './service'

class User extends Component {
    Usercolumns = [
        {
          title: '用户名',
          dataIndex: 'username',
          key:'username',
        },
        {
          title: '手机号码',
          dataIndex: 'auth',
          key:'auth',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key:'sex',
          valueType: 'select', 
          align:"center",
          search:false,
          valueEnum:{
          0:{
              text:'男'
          },
          1:{
            text:'女'
          }
        },
    },
        {
            title: '年龄',
            dataIndex: 'age',
            key:'age',
            search:false
          },
          {
            title: '注册时间',
            dataIndex: 'telPhone',
            key:'telPhone',
            search:false
          },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
            <>             
             <Button type='link' >编辑</Button>          
             <Button type='link' style={{marginLeft:20}} >删除</Button>
             </>
          )
        }
    ]
    constructor(props){
        super(props);
        this.state={

        }
    }
    UserActionRef = React.createRef();

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
                   新建公告信息
                  </Button></Space>}
                     rowKey="userId"
                     actionRef={this.UserActionRef}
                     columns={this.Usercolumns}
                     request={async params =>{
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