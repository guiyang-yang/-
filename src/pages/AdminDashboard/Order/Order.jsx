import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import {getOrderInfo} from './service'
import { PlusOutlined} from '@ant-design/icons'

class Order extends Component {

    forumcolumns = [
        {
          title: '订单号',
          dataIndex: 'forumuserName',
          key:'forumuserName',
          search:false
        },
        {
          title: '顾客名称',
          dataIndex: 'likeNum',
          key:'likeNum',
        },
        {
          title: '手机号',
          dataIndex: 'disNum',
          key:'disNum',
          search:false
        },
        {
            title: '用餐桌号',
            dataIndex: 'StarNum',
            key:'StarNum',
          },
        {
          title: '用餐人数',
          dataIndex: 'commentNum',
          key:'commentNum',
          search: false
        },
        {
          title: '消费金额',
          dataIndex: 'commentNum',
          key:'commentNum',
          search: false
        },
        {
          title: '实付金额',
          dataIndex: 'commentNum',
          key:'commentNum',
          search: false
        },
        {
          title: '收银员',
          dataIndex: 'commentNum',
          key:'commentNum',
          search: false
        },
        {
          title: '支付方式',
          dataIndex: 'commentNum',
          key:'commentNum',
          search: false
        },
        {
          title: '支付时间',
          dataIndex: 'commentNum',
          key:'commentNum',
          search: false,
          sorter: (a, b) => moment(a.commentNum )- moment(b.commentNum),
        },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
             <>
              <Button type='link'>退款</Button>
              <Popconfirm
                  title="确定删除吗"
                  onConfirm={()=>this.deleteForumInfo(record.forumId)}
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
            selectedRowKeys:[]
        }
    }

    ForumActionRef = React.createRef();

    async componentDidMount(){

  }
  deleteForumbatchInfo=async()=>{
    const params = this.state.selectedRowKeys
    const result = await DeleteForumInfo({forumId:params})
    if(result.status === 200){
      Message.success(result.message)
      this.ForumActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }

  deleteForumInfo= async(forumId)=>{
    const params = [forumId]
    const result = await DeleteForumInfo({forumId:params})
    if(result.status === 200){
      Message.success(result.message)
      this.ForumActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }
 
 



    render() {
        return (
            <Card>
                <ProTable  
                     rowKey="forumId"
                     actionRef={this.ForumActionRef}
                     columns={this.forumcolumns}
                     request={async params =>{
                       const result = await getOrderInfo()
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
            </Card>
        )
    }
}



export default Order;