import React, { Component } from 'react'
import {Card,Space,Button,Popconfirm,Message} from 'antd'
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import { PlusOutlined,DownloadOutlined} from '@ant-design/icons'
import {AddCuisine,getCuisine,EditCuisine,DeleteCuisine,DownLoadCuisine} from './service'
import GlobalForm from './GlobalForm'

class Cuisine extends Component {

  Foodcolumns = [
        {
          title: '菜品名称',
          dataIndex: 'food_name',
          key:'food_name',
        },
        {
          title: '单价',
          dataIndex: 'unit_price',
          key:'unit_price',
          search:false
        },
        {
          title: '菜品类型',
          dataIndex: 'type',
          key:'type',
        },
        {
            title: '菜品简介',
            dataIndex: 'food_introduce',
            key:'food_introduce',
            search:false
          },
        {
          title: '菜品图片',
          dataIndex: 'food_pic',
          key: 'food_pic',
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
                  onConfirm={()=>this.DeleteCuisine(record.food_code)}
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
        title:'新建',
        visible:false
      }
  }

    FoodActionRef = React.createRef();

    async componentDidMount(){

  }

  DeleteCuisine= async(id)=>{
    const result = await DeleteCuisine({food_code:id})
    if(result.code === 200){
      Message.success(result.message)
      this.FoodActionRef.current.reloadAndRest()
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
      const result = await AddCuisine(values)
    if(result.code === 200){
      this.setState({
        visible:false
      },()=>{
        Message.success(result.message)
        this.FoodActionRef.current.reloadAndRest()
      })      
    }
    else{
      Message.error(result.message)
    }
  }
    else{
      const result = await EditCuisine(values)
      if(result.code === 200){
        this.setState({
          visible:false
        },()=>{
          Message.success(result.message)
          this.FoodActionRef.current.reloadAndRest()
        })      
      }
      else{
        Message.error(result.message)
      }
    }
  }

  exportXls = async ()=>{
    const data = await DownLoadCuisine({})
    this.getOutExcel('菜品信息.xlsx',data)
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
                  添加菜品
                  </Button>
                  <Button
              type='primary' onClick={this.exportXls} icon={<DownloadOutlined />}
            >
              下载菜品信息
            </Button></Space>}                     
                     rowKey="food_code"
                     actionRef={this.FoodActionRef}
                     columns={this.Foodcolumns}
                     request={async params =>{
                       const newParams={}
                      if(params.food_name){
                        newParams.food_name=params.food_name
                    }
                    if(params.type){
                      newParams.type=params.type
                  }
                       const result = await getCuisine(newParams)
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



export default Cuisine;