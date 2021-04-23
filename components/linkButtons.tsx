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
    // (portfolio && portfolio.links ?
    //   <List>
    //     {portfolio.links.blog ?
    //       <Button
    //         as='a'
    //         size={size}
    //         style={{ display: 'inline-block', margin: '0.2em' }}
    //         href={withHttp(portfolio.links.blog)}
    //         target="_blank"
    //         icon='rss'
    //         circular
    //         onClick={(e) => {
    //           e.stopPropagation();
    //         }} />
    //       : null}
    //     {portfolio.links.linkedin ?
    //       <Button
    //         as='a'
    //         size={size}
    //         style={{ display: 'inline-block', margin: '0.2em' }}
    //         href={withHttp(portfolio.links.linkedin)}
    //         target="_blank"
    //         icon='linkedin'
    //         color='linkedin'
    //         circular
    //         onClick={(e) => {
    //           e.stopPropagation();
    //         }} />
    //       : null}
    //   </List>
    //   : 
      null
      // )

  return (
    buttons
  )
}