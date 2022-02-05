/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import microApp from '@micro-zoe/micro-app'

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  useEffect(() => {
    // https://zeroing.jd.com/micro-app/docs.html#/zh-cn/data
    // 发送数据给子应用 reactApp，setData第二个参数只接受对象类型
    microApp.setData('reactApp', {type: '主动发送给 micro-react 新的数据'})
    setTimeout(() => {
      setCollapsed(true)
    }, 2000)
  }, [])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/app-vue">Vue应用</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/app-react">React应用</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
            <div className="site-layout-background" style={{ minHeight: 360 }}>
              <Routes>
                <Route path='/app-vue' element={<micro-app data={{collapsed}} name='vueApp' url='http://localhost:8080/' />} />
                <Route path='/app-react' element={<micro-app data={{collapsed}} onDataChange={(e) => console.log('来自 micro-react 子应用的数据：', e.detail.data)} name='reactApp' url='http://localhost:4000/' />} />
              </Routes>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>This Project ©2021 Created by Zch</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
