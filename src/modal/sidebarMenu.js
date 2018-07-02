const sidebarMenu=[{
  key:'homepage',
  title:'首页',
  url:'#',
  icon:'home',
},{
  key:'antv',
  title:'图表展示',
  url:'javascript:;',
  icon:'appstore',
  subMenu:[{
    key:'antv-pie',
    title:'饼状图',
    url:'#/antv/pie', 
    icon:'pie-chart',
  },{
    key:'antv-bar',
    title:'柱状图',
    url:'#/antv/bar', 
    icon:'bar-chart',
  },{
    key:'echarts-map',
    title:'地图',
    url:'#/antv/echarts-map', 
    icon:'bar-chart',
  }],
},{
  key:'antd-mobile',
  title:'antd-mobile',
  url:'#/antd-mobile',
  icon:'appstore',
  // subMenu:[{
  //   key:'antd-mobile',
  //   title:'轮播',
  //   url:'#/components/carousel', 
  //   icon:'pie-chart',
  // }],
},{
  key:'components',
  title:'大屏展示',
  url:'#/big-screen',
  icon:'appstore',
},{
  key:'subMenu-1',
  title:'subMenu第一级',
  url:'javascript:;',
  icon:'inbox',
  subMenu:[{
    key:'subMenu-1-1',
    title:'subMenu第二级1',
    url:'javascript:;',
    icon:'inbox',
    subMenu:[{
      key:'subMenu-1-1-1',
      title:'menu级',
      url:'#/subMenu/subMenu1/menu', 
      icon:'inbox',
    }],
  },{
    key:'subMenu-1-2',
    title:'subMenu第二级2',
    url:'#/subMenu/subMenu2', 
    icon:'inbox',
  }],
}];
export default sidebarMenu;