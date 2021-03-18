import React, { Component } from 'react'
import {Modal,Form,Input,Cascader,DatePicker, Message ,InputNumber,Select,Button } from 'antd'
import {cacl} from './service'
const {Option} = Select
export default class GlobalForm extends Component {
    constructor(props){
        super(props)
        this.formRef = undefined
        this.state={
            real_total_money:undefined
        }
    }

    componentDidMount(){
        if(this.props.record){
            const value = {}
            value.should_total_money=this.props.record.should_total_money
            this.setState({
                order_id:this.props.record.order_id
            })
            if(this.formRef){
                this.formRef.setFieldsValue({...value})
            }
        }  
    }

    calc=async()=>{
        const cash = this.formRef.getFieldValue('cash')
        const real_total_money = this.state.real_total_money
        const params={
            cash,
            real_total_money
        }
        console.log(params)
        const result = await cacl(params)
        if(result.code===200){
            Message.success(result.message)
            const value={change:result.result}
            this.formRef.setFieldsValue({...value})
        }
        
        
    }
    onChange=(type,value)=>{      
        this.setState({
            [type]:value
        })
    }



    render() {
        const {visible,onClose,onCreate} = this.props
        return (
            <Modal  
            visible={visible}
            title='结算流程'
            okText="结算"
            cancelText="关闭" 
            onCancel={()=>{
                this.formRef.resetFields()
                onClose()
                }}
            onOk={()=>{
                this.formRef
                    .validateFields()
                    .then((values) => {
                        const params = {}
                        params.real_total_money=this.state.real_total_money
                        params.collector=values.collector
                        const editObj = {...params,order_id:this.state.order_id}
                        this.formRef.resetFields();
                        onCreate(editObj);
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
                    label="收取现金"
                    name="cash"
                    rules={[{required:true,message:'请输入收取现金金额'}]}
                   >
                       <InputNumber min={this.props.record.should_total_money}></InputNumber>
                </Form.Item>
                <Form.Item
                    label="订单金额"
                    name="should_total_money"
                    rules={[{required:true,message:'请输入订单金额金额'}]}
                   >
                       <InputNumber disabled ></InputNumber>
                </Form.Item>
                <Form.Item
                    label="实际收取"
                    name="real_total_money"
                    // rules={[{required:true,message:'请输入实际收取金额'}]}
                   >
                       <InputNumber onChange={(value)=>this.onChange('real_total_money',value)}></InputNumber> <Button disabled={this.state.real_total_money==undefined} style={{marginLeft:'45%'}} onClick={this.calc} type='primary'>计算</Button>
                </Form.Item>
                <Form.Item
                    label="找零"
                    name="change"
                    rules={[{required:true,message:'请输入找零金额'}]}
                   >
                       <InputNumber disabled></InputNumber>
                </Form.Item>
                <Form.Item
                    label="收银员"
                    name="collector"
                    rules={[{required:true,message:'请输入收银员'}]}
                   >
                       <Input ></Input>
                </Form.Item>

                </Form>
            </Modal>
            
        )
    }
}
