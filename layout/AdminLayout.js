import { Component } from 'react';
import { Layout } from 'antd';
import {Menu ,Space} from 'antd';
import {Link } from 'umi';
import routes from '../config/routes'
import './index.less'
import {
  DesktopOutlined ,
  PieChartOutlined,
  FormOutlined,
  CreditCardOutlined,
  UserOutlined,
  SendOutlined,
  RedEnvelopeOutlined
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const icon =[< UserOutlined/>,<SendOutlined />,<FormOutlined />,<CreditCardOutlined />,< PieChartOutlined/>,<RedEnvelopeOutlined />]

export default class BasicLayout extends Component {
  state = {
    collapsed: false,
    current:this.props.location.pathname
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { collapsed } = this.state;
    const AdminRoute = routes&&routes[0].routes.filter(item => item.isShow === true)
    return (
      <Layout style={{ minHeight: '100vh'  ,color: 'white' }}>
      <Sider theme='light'width={200}  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div style={{ height: '32px',backgroundColor:'#008c8c',lineHeight:'32px',textAlign:"center", margin: '16px',overflow:"hidden"}}>
        <Space style={{color:'black'}}>后台管理系统</Space>
        </div>
        <Menu theme="light" mode="inline" onClick={this.handleClick} selectedKeys={[this.state.current]}>
          {
            AdminRoute&&AdminRoute.map((item,i)=>
              <Menu.Item key={item.path}>
                <Link to={item.path}> 
                 {icon[i]}
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            )
          }
          </Menu>
        </Sider>
        <Layout >
        <Header style={{ background: '#fff', textAlign: 'right', padding: 0 }} onClick={()=>sessionStorage.clear()}><Link  style={{marginRight:40}} to='/login'>退出登陆</Link></Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff' ,color:'black',width:' 100%',height: '100%'}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>后台管理员</Footer>
        </Layout>
      </Layout>
    )
  }
}