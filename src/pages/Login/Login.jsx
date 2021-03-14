import React, { Component } from 'react'
import {loginCheck,registerUser} from './service'
import { Form, Input, Button,message ,Card, Tabs, Radio ,InputNumber} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {history} from 'umi'
import styles from './index.less'
import logo from '../images/gduf.png'
import { v4 as uuidv4 } from 'uuid';

const { TabPane } = Tabs;

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    async componentDidMount(){
    }

    onLoginFinish = async values => {
        // const result = await loginCheck(values) 
        // if(result.status === 200){
        //     if(result.auth === 'admin'){
        //         sessionStorage.setItem('admin', result.name)
        //         history.push('/admin/dashboard/user')
        //     }
        //     else if (result.auth === 'black'){
        //         message.error('该账号已被加入黑名单，无法登录')
        //     }
        //     else{
        //         sessionStorage.setItem('user', result.name)
        //         history.push('/user/dashboard/carPooling')
        //     }
        // }
        // else{
        //     message.error('账号或者密码错误')
        // }   
        history.push('/admin/dashboard/user')   
      };

    

    render() {
        return (
            <div className={styles['login']} >
            <Card  style={{minWidth:'25%',marginTop:'10%'}}>
                <p style={{color:'#008c8c',fontWeight:'bold',fontSize:30}}> <img className={styles['img']} src={logo}></img>后台管理系统</p>               
                        <Form
                        name="car_login"           
                        onFinish={this.onLoginFinish}
                        >
                        <Form.Item                    
                            name="username"
                            rules={[{ required: true, message: '请输入账号' }]}
                        >
                            <Input prefix={<UserOutlined  />} style={{  width:' 80%' }} />
                        </Form.Item>
                        <Form.Item                    
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                            prefix={<LockOutlined />}
                            style={{   width:' 80%'}}
                            type="password"
                            />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit"  >
                            登陆
                            </Button>
                        </Form.Item>
                        </Form>                              
            </Card>
            </div>
        )
    }
}
