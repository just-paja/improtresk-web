import Container from 'reactstrap/lib/Container'
import FontAwesome from 'react-fontawesome'
import Nav from 'reactstrap/lib/Nav'
import NavItem from 'reactstrap/lib/NavItem'
import NavLink from 'reactstrap/lib/NavLink'
import PropTypes from 'prop-types'
import React from 'react'

import Message from '../containers/Message'
import Partner from './Partner'

import styles from './Footer.css'

const Footer = ({ currentYear, partners }) => (
  <footer className={styles.footer}>
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.social}>
          <Nav className='justify-content-center'>
            <NavItem>
              <NavLink href='https://fb.com/improtresk/' title={<Message name='social.onFacebook' />}>
                <FontAwesome name='facebook-official' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://twitter.com/hashtag/improtresk' title='#Improtřesk na Twitteru'>
                <FontAwesome name='twitter' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://maps.google.com/?daddr=Nádražní+846,+399+01+Milevsko' title='Trasa na Improtřesk'>
                <FontAwesome name='map-marker' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='mailto:info@improtresk.cz' title='Uživatelská a technická podpora'>
                <FontAwesome name='envelope' />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='tel:+420 728 376 440' title='Kontaktní telefon'>
                <FontAwesome name='phone' />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        {partners.map(partner => <Partner key={partner.name} {...partner} />)}
        <p className='text-center'>
          &copy; <a href='https://improliga.cz'>Česká improvizační liga</a> {currentYear ? <span>{currentYear.year}</span> : null}
        </p>
      </Container>
    </div>
  </footer>
)

Footer.propTypes = {
  currentYear: PropTypes.object,
  partners: PropTypes.arrayOf(PropTypes.object).isRequired
}

Footer.defaultProps = {
  currentYear: null
}

export default Footer
