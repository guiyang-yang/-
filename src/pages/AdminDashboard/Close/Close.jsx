import React, { Component } from 'react'
import {Card,Space,Button,InputNumber,Message,Modal,Form,Input} from 'antd'
import ProTable from '@ant-design/pro-table';
import {getOrderInfo,close} from './service'
import { PlusOutlined} from '@ant-design/icons'
import GlobalForm from './GlobalForm'

class Close extends Component {

  Ordercolumns = [
        {
          title: '订单号',
          dataIndex: 'order_id',
          key:'order_id',
          search:false
        },
        {
          title: '顾客名称',
          dataIndex: 'username',
          key:'username',
        },
        {
          title: '手机号',
          dataIndex: 'pnumber',
          key:'pnumber',
          search:false
        },
        {
            title: '用餐桌号',
            dataIndex: 'table_num',
            key:'table_num',
          },
        {
          title: '用餐人数',
          dataIndex: 'person_num',
          key:'person_num',
          search: false
        },
  
        {
          title: '消费金额',
          dataIndex: 'should_total_money',
          key:'should_total_money',
          search: false
        },
        {
          title: '支付方式',
          dataIndex: 'pay_type',
          key:'pay_type',
          search: false
        },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          valueType: 'option',
          render: (text,record) => (
             <>
              <Button type='link' onClick={()=>this.showModal(record)}>结算</Button>
             </> 
          )
        }
    ]

    

    constructor(props){
        super(props);
        this.state={
            visible:false,
            order_id:undefined,
            
        }
        this.formRef=undefined
    }

    OrderActionRef = React.createRef();

    async componentDidMount(){

  }

  closeModal=()=>{
    this.setState({
      visible:false
    })
  }
  showModal=(record)=>{
    this.setState(pre=>{
      const result = {...pre}
      result.visible = true
      result.record = record
      return result 
    })
  }


  submit=async values=>{ 
    const result = await close(values)
    if(result.code === 200){
      this.setState({
        visible:false
      },()=>{
        Message.success(result.message)
        this.OrderActionRef.current.reloadAndRest()
      })      
    }
    else{
      Message.error(result.message)
    }
  }







    render() {
        return (
            <Card>
                <ProTable  
                     rowKey="order_id"
                     actionRef={this.OrderActionRef}
                     columns={this.Ordercolumns}
                     request={async params =>{
                      const newparams={}
                      if(params.username){
                       newparams.username=params.username
                      }
                      if(params.table_num){
                       newparams.table_num=params.table_num
                      }
                       const result = await getOrderInfo(newparams)
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
                      {this.state.visible?<GlobalForm  onClose={this.closeModal} onCreate={this.submit} {...this.state}  />:null} 
            </Card>
        )
    }
}



export default Close;