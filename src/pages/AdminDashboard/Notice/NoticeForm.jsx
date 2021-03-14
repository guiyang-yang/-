import React, { Component } from 'react'
import {Modal,Form,Input} from 'antd'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

export default class NoticeForm extends Component {
    constructor(props){
        super(props)
        this.formRef = undefined
        this.state={
            
        }
    }



    
    render() {

        const {visible,onClose,onCreate} = this.props
        return (
            <Modal  
            visible={visible}
            title='新建公告'
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
                        const newparams = {...values}
                        newparams.createDate = moment().format('YY-MM-DD hh:mm:ss')
                        newparams.noticeId = uuidv4()
                        this.formRef.resetFields();
                        onCreate(newparams);
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
                    name="title"
                    rules={[{required:true,message:'请输入标题'}]}
                   >
                     <Input  placeholder="请输入标题" />            
                </Form.Item>
                <Form.Item
                    label="内容"
                    name="description"
                    rules={[{required:true,message:'请输入内容'}]}
                >
                    <Input.TextArea  placeholder="请输入内容" />
                </Form.Item>
                </Form>
            </Modal>
            
        )
    }
}
