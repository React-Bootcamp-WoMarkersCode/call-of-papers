import React from 'react'
import Routes from './Routes'
import { Layout, Button } from 'antd'
import Menu from './components/Menu'
import Rodape from './components/Footer'
import Partners from './pages/Events/Partners'
import 'antd/dist/antd.css'

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<Layout style={{minHeight: "calc(100vh - 70px)"}}>
			<Header style={{boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.20)'}}>
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
