import React from 'react';
import Routes from './Routes';
import { Layout } from 'antd';
import Menu from './components/Menu';
import './App.css';

const { Header, Footer, Content } = Layout;

const App = () => {
	return (
		<Layout>
			<Header>
				<Menu />
			</Header>
			<Content className="App">
				<Routes />
			</Content>
			<Footer className="App">Footer</Footer>
		</Layout>
	);
};

export default App;
