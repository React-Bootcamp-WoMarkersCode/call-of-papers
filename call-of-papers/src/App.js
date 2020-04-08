import React from 'react'
import Routes from './Routes'
import { Layout, Button } from 'antd'
import Menu from './components/Menu'
import Rodape from './components/Footer'
import Partners from './pages/Events/Partners'

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<Layout style={{minHeight: "calc(100vh - 70px)"}}>
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
