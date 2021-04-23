import { Button, List, Icon, SemanticSIZES } from 'semantic-ui-react';
import { withHttp } from '../util/helpers';
import { Portfolio } from '../types/portfolio.types';

export default function LinkButtons(
  { portfolio, size, isTextList }: {
    portfolio: Portfolio,
    size?: SemanticSIZES,
    isTextList?: boolean
  }) {

  const buttons =
    (portfolio && portfolio.links ?
      <List>
        {portfolio.links.blog ?
          <Button
            as='a'
            size={size}
            style={{ display: 'inline-block', margin: '0.2em' }}
            href={withHttp(portfolio.links.blog)}
            target="_blank"
            icon='rss'
            circular
            onClick={(e) => {
              e.stopPropagation();
            }} />
          : null}
        {portfolio.links.linkedin ?
          <Button
            as='a'
            size={size}
            style={{ display: 'inline-block', margin: '0.2em' }}
            href={withHttp(portfolio.links.linkedin)}
            target="_blank"
            icon='linkedin'
            color='linkedin'
            circular
            onClick={(e) => {
              e.stopPropagation();
            }} />
          : null}
      </List>
      : null)

  const textList = (
    (portfolio && portfolio.links ?
      <List link style={{ fontSize: '1.33em' }}>
        <List.Item
          href={withHttp(portfolio.links.website)}
          target='_blank'><Icon name='linkify' />{portfolio.links.website}</List.Item>
        {portfolio.links.linkedin ?
          <List.Item
            href={withHttp(portfolio.links.linkedin)}
            target='_blank'><Icon name='linkedin' />LinkedIn</List.Item>
          : null}
        {portfolio.links.blog ?
          <List.Item
            href={withHttp(portfolio.links.blog)}
            target='_blank'><Icon name='rss' />Blog</List.Item>
          : null}
      </List>
      : null))

  return (
    isTextList ? textList : buttons
  )
}