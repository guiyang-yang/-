import React, { Component } from 'react';
import { Card, Tabs,Input } from 'antd';

import { getDataInfo } from './service';
const { TabPane } = Tabs;
class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
        result:[]
    };
  }

  async componentDidMount() {
    const result = await getDataInfo({});
    this.setState({
         result
    })
  }


  render() {
      const {result} = this.state 
    return (
      <Card>
        <Tabs defaultActiveKey='1'>
            {result&&result.map(v=>
                {
                    return (
                    <TabPane tab={v.data_title} key={v.data_id} >
                        <div style={{display:'flex'}} >
                        <img src={v.data_pic} alt="无法加载图片" />
                        <Input.TextArea style={{height:'200px'}} row={25} col={10} value={v.data_content}></Input.TextArea>
                        </div>
                               
                    </TabPane>
                )
            }
                
            )}
             
     
          
        </Tabs>
      </Card>
    );
  }
}

export default Data;
