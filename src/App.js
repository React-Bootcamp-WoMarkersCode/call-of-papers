import React from 'react'
import { Space, Row } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import 'antd/dist/antd.css'

import Routes from './Routes'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import Menu from './components/Menu'
import './index.scss'

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

			<Footer>
        <Row justify="space-between" style={{ width: '100%' }}>
          <div>
            <span>Feito com </span>
            <FontAwesomeIcon icon={faHeart} className="heart-icon"/>
            <span>por mulheres da comunidade WoMarkersCode</span>
          </div>
          <div>
          <Space size="large">
            <Link to="/about">Sobre</Link>
            <a
              href=" mailto:sharingtalks@hotmail.com?subject=Fale com Sharing Talks"
              target="_blank"
            >
              Contato
            </a>
            © Sharing Talks 2020
          </Space>
          </div>
        </Row>
			</Footer>
		</Layout>
	)
}

export default App
