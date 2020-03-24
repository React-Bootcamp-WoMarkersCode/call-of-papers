import React from 'react'
import Routes from './Routes'
import { Layout } from 'antd'
import Menu from './components/Menu'

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<Layout>
			<Header>
				<Menu />
			</Header>
			<Content>
				<Routes />
			</Content>
			<Footer>Footer</Footer>
		</Layout>
	)
}

export default App
