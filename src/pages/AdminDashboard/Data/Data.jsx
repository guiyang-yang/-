import React, { Component } from 'react'
import {Card,Tabs} from 'antd'
import yayImg from '../../images/1.jpg';
import yayImg1 from '../../images/2.jpg';
import yayImg2 from '../../images/3.jpg';
import yayImg3 from '../../images/car.jpg';
const { TabPane } = Tabs;
class Data extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }


    render() { 
        return (
            <Card>
                 <Tabs defaultActiveKey="1" >
                        <TabPane tab="Tab 1" key="1">
                            <img src={yayImg} alt=""/>
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                        <img src={yayImg1} alt=""/>
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        <img src={yayImg2} alt=""/>
                        </TabPane>
                        <TabPane tab="Tab 4" key="4">
                        <img src={yayImg3} alt=""/>
                        </TabPane>
                        <TabPane tab="Tab 4" key="4">
                        <img src={yayImg3} alt=""/>
                        </TabPane>
                    </Tabs>
            </Card>
        )
    }
}

export default Data