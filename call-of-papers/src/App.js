import React from 'react'
import Routes from './Routes'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import Menu from './components/Menu'
import FBLogin from './pages/Login/FBLogin'
import 'antd/dist/antd.css'
import './index.scss'

const { Header, Footer, Content } = Layout

const App = () => {
	return (
		<Layout>
			<Header>
				<Menu />
			</Header>

			<Content>
        <FBLogin />
				<Routes />
			</Content>

			<Footer>
        <Link to="/about">About <i>Call for Papers</i></Link>
        © Copyright Call For Papers 2020
			</Footer>
		</Layout>
	)
}

export default App
