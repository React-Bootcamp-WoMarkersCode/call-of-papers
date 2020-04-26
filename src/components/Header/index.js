import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Col, Row } from 'antd'

const { Title } = Typography


const Header = ({ text }) => {
  return (
    <Title level={3}>
      {text}
    </Title>
  )
}

Header.propTypes = {
  text: PropTypes.string,
}

export default Header
