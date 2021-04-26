import { List, Icon } from 'semantic-ui-react';
import { withHttp } from '../util/helpers';

export default function LinkButtons({ profiles }: { profiles: any }) {

  return (profiles ?
    <List horizontal size='large'>
      {profiles.map((profile: any) =>
        <List.Item key={profile.network}>
          <a
            style={{ fontSize: '1.33em' }}
            href={withHttp(profile.url)}
            target='_blank'
            rel="noopener">
            <Icon name={profile.icon ? profile.icon : 'linkify'} /></a>
        </List.Item>)}
    </List>
    :
    null
  )
}