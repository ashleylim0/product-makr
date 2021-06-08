import { useState } from 'react';
import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';
import { Menu, Icon, Sidebar } from 'semantic-ui-react';
import { withHttp } from '../util/helpers';
import { Portfolio } from '../types/portfolio.types';

export default function Page({ children, portfolio }: {
  children: React.ReactNode,
  portfolio?: Portfolio
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <main>
        <Navbar
          portfolio={portfolio}
          openDrawer={() => visible ? setVisible(false) : setVisible(true)} />
        {children}
        <Sidebar
          className='sidebar-menu'
          as={Menu}
          animation='overlay'
          direction='right'
          onHide={() => setVisible(false)}
          vertical
          visible={visible}>
          <Menu.Item style={{ display: 'flex', justifyContent: 'right' }} onClick={() => { setVisible(false) }}>
            <div className='sidebar-text'>
              <Icon name='close' /></div>
          </Menu.Item>
          <Menu.Item as='a'>
            <Link href='/about'>
              <div style={{ padding: '0.5em' }} className='sidebar-text'>
                <Icon name='user outline' />About Me</div>
            </Link>
          </Menu.Item>
          {portfolio.projects && portfolio.projects.length > 0 ?
            <Menu.Item as='a'>
              <Link href='/projects'>
                <div style={{ padding: '0.5em' }} className='sidebar-text'>
                  <Icon name='suitcase' />Projects</div>
              </Link>
            </Menu.Item>
            : null}
          {portfolio.highlights && portfolio.highlights.length > 0 ?
            <Menu.Item as='a'>
              <Link href='/highlights'>
                <div style={{ padding: '0.5em' }} className='sidebar-text'>
                  <Icon name='star outline' />Highlights</div>
              </Link>
            </Menu.Item>
            : null}
          {portfolio.blog ?
            <Menu.Item
              as='a'
              href={withHttp(portfolio.blog)}
              target='_blank'
              rel='noopener'>
              <div
                style={{ padding: '0.5em' }}
                className='sidebar-text'><Icon name='pencil alternate' />Blog</div>
            </Menu.Item>
            : null}
          {portfolio.podcast ?
            <Menu.Item
              as='a'
              href={withHttp(portfolio.podcast)}
              target='_blank'
              rel='noopener'>
              <div
                style={{ padding: '0.5em' }}
                className='sidebar-text'><Icon name='podcast' />Podcast</div>
            </Menu.Item>
            : null}
          {portfolio.resume ?
            <Menu.Item
              as='a'
              href={withHttp(portfolio.resume)}
              target='_blank'
              rel='noopener'>
              <div
                style={{ padding: '0.5em' }}
                className='sidebar-text'><Icon name='file alternate outline' />Resume</div>
            </Menu.Item>
            : null}
          {portfolio.profiles[0] && portfolio.profiles[0].network == 'LinkedIn' ?
            <Menu.Item
              as='a'
              href={withHttp(portfolio.profiles[0].url)}
              target='_blank'
              rel='noopener'>
              <div
                style={{ padding: '0.5em' }}
                className='sidebar-text'><Icon name='linkedin' />LinkedIn</div>
            </Menu.Item>
            : null}
          {portfolio.email ?
            <Menu.Item
              as='a'
              href={`mailto:${portfolio.email}`}
              target='_blank'
              rel='noopener'>
              <div
                style={{ padding: '0.5em' }}
                className='sidebar-text'><Icon name='envelope outline' />Contact</div>
            </Menu.Item>
            : null}
        </Sidebar>
      </main>
      <Footer portfolio={portfolio} />
    </>
  )
}