import React, { Component } from 'react'
import {Modal,Form,Input} from 'antd'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import ImageUpload from './ImageUpload'

export default class NoticeForm extends Component {
    constructor(props){
        super(props)
        this.formRef = undefined
        this.state={
            
        }
    }

    componentDidMount(){
        if(this.props.record){
            if(this.props.title === '编辑'){
                const value = {...this.props.record}
                this.setState({
                    userid:value.userid
                })
                if(this.formRef){
                    this.formRef.setFieldsValue({...value})
                }
            }
        }  
    }

    
    render() {
        const {visible,onClose,onCreate,title} = this.props
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
                        const newObj = {...values}
                        const editObj = {...values,sale_id:this.state.sale_id}
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
                    label="标题"
                    name="sale_title"
                    rules={[{required:true,message:'请输入标题'}]}
                   >
                     <Input  placeholder="请输入标题" />            
                </Form.Item>
                <Form.Item
                    label="内容"
                    name="sale_content"
                    rules={[{required:true,message:'请输入内容'}]}
                >
                    <Input.TextArea  placeholder="请输入内容" />
                </Form.Item>
                <Form.Item
            label="菜品图片"
            name="food_pic"
          >
            <ImageUpload />
            </Form.Item>
                </Form>
            </Modal>
            
        )
    }
}
