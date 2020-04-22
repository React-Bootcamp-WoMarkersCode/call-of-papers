import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Row } from 'antd'

const Header = ({ text }) => {
  return (
    <Row gutter={[16, 24]}>
      <Divider orientation="left">
        {text}
      </Divider>
    </Row>
  )
}

Header.propTypes = {
  text: PropTypes.string,
}

export default Header
