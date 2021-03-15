import React, { Component } from 'react'
import {Modal,Form,Input,Cascader,DatePicker, Space ,InputNumber,Select,Radio } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

const {Option} = Select
export default class GlobalForm extends Component {
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
                        const {pnumber,username,gender,password} = values
                        const newObj = {...Formvalue,pnumber,username,gender,password}
                        const editObj = {...values,userid:this.state.userid}
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
                    label="用户名"
                    name="username"
                    rules={[{required:true,message:'请输入用户名'}]}
                   >
                       <Input ></Input>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required:true,message:'请输入密码'}]}
                   >
                       <Input  type="password"></Input>
                </Form.Item>
                <Form.Item
                    label="生日"
                    name="birthday"
                    //  rules={[{required:true,message:'请输入生日'}]}
                   >
                        <Space direction="vertical" size={12}>
                        {title==='编辑'?<DatePicker  format="YYYY-MM-DD " showTime value={this.props.record?moment(this.props.record.startDate):null}  onChange={(value,dateString)=>this.onChange('birthday',value,dateString)} />:
                            <DatePicker   format="YYYY-MM-DD" showTime  onChange={(value,dateString)=>this.onChange('birthday',value,dateString)}  />}
                        </Space>          
                </Form.Item>
                <Form.Item label="性别" name="gender"  rules={[{ required: true, message: '请选择性别' }]}>
                        <Radio.Group  > 
                        <Radio value="男">男</Radio>
                        <Radio value="女">女</Radio>
                    </Radio.Group>
                        </Form.Item>
                <Form.Item
                    label="联系人电话"
                    name="pnumber"
                    rules={[
                        {required:true,message: '请输入手机号'},
                        {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'
                        },
                      ]}
                   >
                        <Input placeholder="请输入手机号码" />          
                </Form.Item>

                </Form>
            </Modal>
            
        )
    }
}
