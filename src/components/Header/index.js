import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Row } from 'antd'

const Header = ({ text }) => {
  return (
    <Row>
      <Divider orientation="left">
        <div className='divider-style'>{text}</div>
      </Divider>
    </Row>
  )
}

Header.propTypes = {
  text: PropTypes.string,
}

export default Header
