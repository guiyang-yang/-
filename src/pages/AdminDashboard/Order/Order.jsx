import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message,Modal,Form,Input} from 'antd'
import ProTable from '@ant-design/pro-table';
import {getOrderInfo,DeleteOrderInfo,orderRefund,DownLoadOrder} from './service'
import { PlusOutlined,DownloadOutlined} from '@ant-design/icons'

class Order extends Component {

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
          title: '应付金额',
          dataIndex: 'should_total_money',
          key:'should_total_money',
          search: false
        },
        {
          title: '实付金额',
          dataIndex: 'real_total_money',
          key:'real_total_money',
          search: false
        },
        {
          title: '收银员',
          dataIndex: 'collector',
          key:'collector',
          search: false
        },
        {
          title: '支付方式',
          dataIndex: 'pay_type',
          key:'pay_type',
          search: false
        },
        {
          title: '支付时间',
          dataIndex: 'paytime',
          valueType:'dateTime',
          key:'paytime',
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
              <Button type='link' disabled={record.flag_refund===1} onClick={()=>this.showModal(record.order_id)}>退款</Button>
              <Popconfirm
                  title="确定删除吗"
                  onConfirm={()=>this.DeleteOrderInfo(record)}
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
            order_id:undefined
        }
    }

    OrderActionRef = React.createRef();

    async componentDidMount(){

  }

  closeModal=()=>{
    this.setState({
      visible:false
    })
  }

  showModal=(id)=>{
    this.setState({
      visible:true,
      order_id:id
    })
  }

  submit=async values=>{ 
    const result = await orderRefund(values)
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



  DeleteOrderInfo= async(record)=>{
    const params = {}
    params.pnumber=record.pnumber
    params.order_id=record.order_id
    const result = await DeleteOrderInfo(params)
    if(result.code === 200){
      Message.success(result.message)
      this.OrderActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }
 
  exportXls = async ()=>{
    const data = await DownLoadOrder({})
    this.getOutExcel('订单信息.csv',data)
  }

  getOutExcel= (fileName, res)=> {
      const blob = new Blob([res], { type: 'application/vnd.ms-excel,charset=utf-8' });
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
        return (
            <Card>
                <ProTable  
                headerTitle={
                  <Space>
                  <Button
            type='primary' onClick={this.exportXls} icon={<DownloadOutlined />}
          >
            下载订单信息
          </Button></Space>}
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
                       <Modal  
            visible={this.state.visible}
            title='退款流程'
            okText="确定"
            cancelText="关闭" 
            onCancel={()=>{
                this.formRef.resetFields()
                this.closeModal()
                }}
            onOk={()=>{
                this.formRef
                    .validateFields()
                    .then((values) => {
                        const editObj = {...values,order_id:this.state.order_id}
                        this.formRef.resetFields();
                        this.submit(editObj);
          })
            }}
            destroyOnClose>
            <Form
               ref={ref => {
                this.formRef = ref;
              }}
                layout="vertical"
                name="form_in_modal"
               
                >
                <Form.Item
                    label="退款理由"
                    name="refund_reason"
                    rules={[{required:true,message:'请输入退款理由'}]}
                   >
                       <Input ></Input>
                </Form.Item>

                </Form>
            </Modal>
            </Card>
        )
    }
}



export default Order;