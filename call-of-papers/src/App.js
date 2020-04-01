import React from 'react'
import Routes from './Routes'
import { Layout } from 'antd'
import Menu from './components/Menu'
import Partners from './pages/Events/Partners'

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<Layout>
			<Header>
				<Menu />
			</Header>
			<Content style={{padding: '30px 0'}}>
				<Routes />
				<Partners/>
			</Content>
			<Footer>Footer</Footer>
		</Layout>
	)
}

export default App
