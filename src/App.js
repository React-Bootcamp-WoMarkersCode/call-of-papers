import React from 'react'
import { useLocation } from 'react-router-dom'
import { Space, Row } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import 'antd/dist/antd.css'

import Routes from './Routes'
import { Col,Layout } from 'antd'
import { Link } from 'react-router-dom'
import Menu from './components/Menu'
import './index.scss'

const { Header, Footer, Content } = Layout

const App = () => {
  const location = useLocation();
	return (
		<Layout>
			<Header>
				<Menu />
			</Header>

      <Content>
        {location.pathname === '/' ? (
          <Routes />
        ) : (
          <Row style={{ paddingTop: '2rem'}}>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }}>
              <Routes />
            </Col>
          </Row>
        )
      }
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
            <Link to="/termos-de-uso">Termos</Link>
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
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
