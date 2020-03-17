import React from 'react';
import Routes from './Routes';
import { Layout } from 'antd';
import './App.css';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Header style={{color: '#FFF'}}>Menu</Header>
        <Content>
          <Routes/>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  )
}

export default App;
