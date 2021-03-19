import React, { Component } from 'react'
import {Modal,Form,Input,Cascader,DatePicker, Space ,InputNumber,Select,Upload } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import ImageUpload from './ImageUpload'
import { PlusOutlined,LoadingOutlined} from '@ant-design/icons'
const {Option} = Select
export default class GlobalForm extends Component {
    constructor(props){
        super(props)
        this.formRef = undefined
        this.state={
            loading:false,
            imageUrl:undefined
        }
    }

    componentDidMount(){
        if(this.props.record){
            if(this.props.title === '编辑'){
                const value = {...this.props.record}
                this.setState({
                    food_code:value.food_code
                })
                if(this.formRef){
                    this.formRef.setFieldsValue({...value})
                }
            }
        }  
    }

    onChange=(type,value,dateString)=>{
        if(type==='startDate'){
            this.setState({
                [type]:dateString
            })
        }
        else if(type==='startPoint'||type==='endPoint'){
            this.setState({
                [type]:value.join(' ')
            })
        }
        else{
            this.setState({
                [type]:value
            })
        }
    }

    
  getImageName=imgUrl=>{
    this.setState({
      imgUrl
    })
  }



    render() {
        const {visible,title,onClose,onCreate} = this.props
        const Formvalue = this.state
        return (
            <Modal  
            visible={visible}
            title={title}
            okText="确定"
            cancelText="关闭" 
            onCancel={()=>{
                this.formRef.resetFields()
                onClose()
                }}
            onOk={()=>{
                this.formRef
                    .validateFields()
                    .then((values) => {
                       
                        const newObj = {...values,food_pic:this.state.imgUrl}
                        const editObj = {...values,food_code:this.state.food_code,food_pic:this.state.imgUrl}
                        this.formRef.resetFields();
                        onCreate(title==='编辑'?editObj:newObj,title);
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
                    label="菜品名称"
                    name="food_name"
                    rules={[{required:true,message:'请输入菜品名称'}]}
                   >
                       <Input ></Input>
                </Form.Item>
                <Form.Item
                    label="菜品简介"
                    name="food_introduce"
                    rules={[{required:true,message:'请输入菜品简介'}]}
                   >
                       <Input ></Input>
                </Form.Item>
                <Form.Item
                    label="菜品类型"
                    name="type"
                    rules={[{required:true,message:'请输入菜品类型'}]}
                   >
                       <Input ></Input>
                </Form.Item>
                <Form.Item
            label="菜品图片"
            name="food_pic"
          >
            <ImageUpload   avatar={this.props.record&&this.props.record.food_pic} getImageName={this.getImageName}/>
            </Form.Item>
                <Form.Item
                    label="菜品价格"
                    name="unit_price"
                    rules={[{required:true,message:'请输入菜品价格'}]}
                   >
                       <InputNumber ></InputNumber>
                </Form.Item>

                </Form>
            </Modal>
            
        )
    }
}
