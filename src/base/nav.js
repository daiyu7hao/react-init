import React from 'react';
import { Menu, Icon, Button } from 'antd';
import sidebarMenu from '../modal/sidebarMenu';
const SubMenu = Menu.SubMenu;

export default class Nav extends React.Component {
  state = {
    collapsed: false,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <aside className="nav">
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={this.state.collapsed}
        >
          {getSidebarMenu(sidebarMenu)}
        </Menu>
      </aside>
    );
  }
}
function getSidebarMenu(menuData){
  return menuData.map(v=>{
    if(v.subMenu){
      return <SubMenu key={v.key} title={<span><Icon type={v.icon||''} /><span>{v.title}</span></span>}>
        {getSidebarMenu(v.subMenu)}
      </SubMenu>;
    }else{
      return <Menu.Item key={v.key}><a href={v.url}><Icon type={v.icon||''} /><span>{v.title}</span></a></Menu.Item>;
    }
  });
}