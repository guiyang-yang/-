import React, { Component } from 'react'
import {Modal,Form,Input,InputNumber} from 'antd'


export default class TableForm extends Component {
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
                    sale_id:value.sale_id
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
                        const newObj = {...values,sale_pic:this.state.imgUrl}
                        const editObj = {...values,sale_id:this.state.sale_id,sale_pic:this.state.imgUrl}
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
                    label="餐桌名"
                    name="sale_title"
                    rules={[{required:true,message:'请输入餐桌名'}]}
                   >
                     <Input  placeholder="请输入餐桌名" />            
                </Form.Item>
                <Form.Item
                    label="餐桌人数"
                    name="sale_content"
                    rules={[{required:true,message:'请输入餐桌容纳人数'}]}
                >
                    <InputNumber   />
                </Form.Item>
            
                </Form>
            </Modal>
            
        )
    }
}
