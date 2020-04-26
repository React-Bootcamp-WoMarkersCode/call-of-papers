import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import HorizontalMenu from './HorizontalMenu'
import VerticalMenu from './VerticalMenu'
import './style.scss'

const HeaderComponent = () => {
  const history = useHistory()
  const [ mobileViewport, setMobileViewport ] = useState(window.innerWidth <= 425)
  const userPicture = localStorage.getItem('userPicture')
  const userRole = localStorage.getItem('userId') ? localStorage.getItem('userRole') : ''
  const location = useLocation()

  const handleResize = () => {
    setMobileViewport(window.innerWidth <= 425)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  const logout = () => {
    localStorage.clear()
    history.push('/');
  }

  return (
    <div className={['menu-container', mobileViewport ? 'menu-mobile' : '']}>
      <Link to='/'>
        <img src={require('../../assets/logo.png')} alt='Sharing Talks' className='logo' />
        <img src={require('../../assets/logo-mobile.png')} alt='Sharing Talks' className='logo-mobile' />
      </Link>
      <div className='menu'>
      {
        location.pathname === '/login' ? <></> :
        (!mobileViewport ?
          <HorizontalMenu history={history} userPicture={userPicture} userRole={userRole} logout={logout} /> :
          <VerticalMenu history={history} userPicture={userPicture} userRole={userRole} logout={logout} />
        )
      }
      </div>
    </div>
  )
}

export default HeaderComponent
