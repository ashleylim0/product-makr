import { useState } from 'react';
import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';
import { Menu, Icon, Sidebar } from 'semantic-ui-react';
import NavHeader from './navHeader';

export default function Page({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  //TODO load initial props to pass to components
  return (
    <>
      <main>
        <Navbar
          name="Rene DeAnda"
          openDrawer={() => visible ? setVisible(false) : setVisible(true)} />
        <NavHeader
          name="Rene DeAnda"
          title="PM" />
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
            <div className='navbar-text2'>
              <Icon name='close' /></div>
          </Menu.Item>
          <Menu.Item
            as='a'
            href=''
            target='_blank'>
            <div
              style={{ padding: '0.5em' }}
              className='navbar-text2'><Icon name='linkify' />Link</div>
          </Menu.Item>
        </Sidebar>
      </main>
      <Footer />
    </>
  )
}