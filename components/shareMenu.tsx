import { Button, Dropdown } from 'semantic-ui-react';

export default function ShareMenu({ url }: { url: string }) {

  return (
    <Dropdown
      as={Button}
      basic
      icon='share alternate'
      className='icon'
      button
      direction='left'
      circular
      floating>
      <Dropdown.Menu>
        <Dropdown.Item
          as='a'
          rel='noopener'
          href={`mailto:?subject=Product Makr&body=Check this out: ${url}`}
          target="_blank"
          icon={{ name: 'mail' }}
          text='Share by Email' />
        <Dropdown.Item
          as='a'
          rel='noopener'
          href={`https://twitter.com/intent/tweet/?text=Check this out&url=${url}&via=redeio`}
          target="_blank"
          icon={{ name: 'twitter' }}
          text='Share on Twitter' />
      </Dropdown.Menu>
    </Dropdown>
  )
}