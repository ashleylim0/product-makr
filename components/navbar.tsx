import Link from 'next/link';
import { Container, Menu, Icon, List, Header } from 'semantic-ui-react';
import { withHttp } from '../util/helpers';
import { Portfolio } from '../types/portfolio.types';

export default function Navbar({ openDrawer, portfolio }: {
  openDrawer: () => void,
  portfolio: Portfolio
}) {

  return (
    <>
      <div
        className='Navbar'>
        <Menu secondary style={{ width: '100vw' }}>
          <Container>
            <Menu.Item>
              <Link href='/'>
                <a className='navbar-text'>{portfolio.name}</a>
              </Link>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                className='hamburger-item'
                onClick={() => { openDrawer() }}>
                <Icon
                  size='large'
                  name='bars'
                  className='hamburger' />
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
      <div className='nav-header'>
        <Container
          textAlign='center'
          style={{ width: '100vw', margin: '3em 0' }}>
          <Header
            style={{ fontSize: '1.8em', wordWrap: 'break-word' }}>
            <Link href='/'>
              <a className='navbar-text'>{portfolio.name}</a>
            </Link>
          </Header>
          <List horizontal style={{ width: '100vw' }}>
            <List.Item>
              <Link href='/about'>
                <a className='nav-button-text'>About</a>
              </Link>
            </List.Item>
            {portfolio.blog ? <List.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={withHttp(portfolio.blog)}
                className='nav-button-text'>
                Blog</a>
            </List.Item> : null}
            {portfolio.podcast ? <List.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={withHttp(portfolio.podcast)}
                className='nav-button-text'>
                Podcast</a>
            </List.Item> : null}
            {portfolio.resume ? <List.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={withHttp(portfolio.resume)}
                className='nav-button-text'>
                Resume</a>
            </List.Item> : null}
            {portfolio.profiles[0] && portfolio.profiles[0].network == 'LinkedIn' ? <List.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={withHttp(portfolio.profiles[0].url)}
                className='nav-button-text'>
                LinkedIn</a>
            </List.Item> : null}
            {portfolio.email ? <List.Item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${portfolio.email}`}
                className='nav-button-text'>
                Contact</a>
            </List.Item> : null}
          </List>
        </Container>
      </div>
    </>
  )
}