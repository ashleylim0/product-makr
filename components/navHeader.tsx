import Link from 'next/link';
import { Button, Container, List, Icon, Header } from 'semantic-ui-react';

export default function NavHeader({ name, title, blog, podcast, resume, linkedin }: {
  name: string,
  title: string,
  blog?: string,
  podcast?: string,
  resume?: string,
  linkedin?: {}
}) {

  return (
    <div className='nav-header'>
      <Container
        textAlign='center'
        style={{ width: '100vw', margin: '3em 0' }}>
        <Header
          className='main-item'
          style={{ fontSize: '2em', wordWrap: 'break-word' }}>
          <Link href='/'>
            <a className='navbar-text'>{name}</a>
          </Link>
          <div style={{ color: '#0C5FFF' }}>{title}</div>
        </Header>
        <List horizontal style={{ width: '100vw' }}>
          <List.Item
            href="/"
            content="Home"></List.Item>
          <List.Item
            href="/about"
            content="About"></List.Item>
          {blog ? <List.Item
            href={blog}
            content="Blog">
          </List.Item> : null}
          {podcast ? <List.Item
            href={podcast}
            content="Podcast">
          </List.Item> : null}
          {podcast ? <List.Item
            href={podcast}
            content="Podcast">
          </List.Item> : null}
          {podcast ? <List.Item
            href={podcast}
            content="Podcast">
          </List.Item> : null}

        </List>
      </Container>
    </div>
  )
}