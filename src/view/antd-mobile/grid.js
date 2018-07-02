import React, { Component } from 'react';
import {Grid} from 'antd-mobile';
export default class GridExample extends Component {
  render() {
    return (
      <div>
        <Grid data={data} activeStyle={false} />
      </div>
    );
  }
}
const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));