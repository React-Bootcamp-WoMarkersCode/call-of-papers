import React from 'react'
import Routes from './Routes'
import { Layout } from 'antd'
import Menu from './components/Menu'
import Rodape from './components/Footer'
import 'antd/dist/antd.css'

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<Layout>
			<Header>
				<Menu />
			</Header>
			<Content style={{padding: '30px 0'}}>
				<Routes />
			</Content>
			<Footer style={{bottom:'0'}}>
				<Rodape />
			</Footer>
		</Layout>
	)
}

export default App
