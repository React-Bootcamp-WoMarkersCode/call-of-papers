import React from 'react'
import Routes from './Routes'
import { Layout, Button } from 'antd'
import Menu from './components/Menu'
import Partners from './pages/Events/Partners'

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<Layout>
			<Header>
				<Menu />
			</Header>
			<Content>
				<Routes />
				<Partners/>
			</Content>
			<Footer>Footer <Button type="primary">Button</Button> </Footer>
		</Layout>
	)
}

export default App
