import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import { PlusOutlined} from '@ant-design/icons'
import {DeleteCarInfo} from './service'


class Cuisine extends Component {

    Carcolumns = [
        {
          title: '菜品名称',
          dataIndex: 'initiator',
          key:'initiator',
        },
        {
          title: '单价',
          dataIndex: 'startPoint',
          key:'startPoint',
          search:false
        },
        {
          title: '菜品类型',
          dataIndex: 'endPoint',
          key:'endPoint',
        },
        {
            title: '菜品简介',
            dataIndex: 'restNum',
            key:'restNum',
            search:false
          },
        {
          title: '菜品图片',
          dataIndex: 'image',
          key: 'image',
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
             <Button type='link'>编辑</Button>
              <Popconfirm
                  title="确定删除吗"
                  onConfirm={()=>this.deleteCarInfo(record.carInfoid)}
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

    CarActionRef = React.createRef();

    async componentDidMount(){

  }

  deleteCarbatchInfo=async()=>{
    const params = this.state.selectedRowKeys
    const result = await DeleteCarInfo({carInfoid:params})
    if(result.status === 200){
      Message.success(result.message)
      this.CarActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }

  deleteCarInfo= async(carInfoid)=>{
    const params = [carInfoid]
    const result = await DeleteCarInfo({carInfoid:params})
    if(result.status === 200){
      Message.success(result.message)
      this.CarActionRef.current.reloadAndRest()
    }
    else{
      Message.error(result.message)
    }
  }
 



    render() {
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
                      rowSelection={{
                        type: "checkbox",                   
                        onChange: (selectedRowKeys, selectedRows) => { 
                          this.setState({
                            selectedRowKeys
                          })                   
                        }
                      }
                    }
                    tableAlertOptionRender={() => {
                      return (
                        <Space size={16}>
                          <Popconfirm
                              title="确定删除吗"
                              onConfirm={()=>this.deleteCarbatchInfo()}
                              okText="确定"
                              cancelText="取消"
                            >
                          <a>批量删除</a>
                          </Popconfirm>
                        </Space>
                      );
                    }}
                     rowKey="carInfoid"
                     actionRef={this.CarActionRef}
                     columns={this.Carcolumns}
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
            </Card>
        )
    }
}



export default Cuisine;