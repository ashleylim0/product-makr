import { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Header,
  Container
} from 'semantic-ui-react';
import fs from 'fs';
import path from 'path';
import Page from '../../components/page';
import Meta from '../../components/Meta';
import { shuffle } from '../../util/helpers';
import { GetStaticProps } from 'next';

export default function Cases({ companies }: { companies: any[] }) {

  return (
    <div>
      <Meta
        title='Case Studies'
        desc='Open-source project to help Product Managers make portfolio pages and improve their job hunt.'
        canonical='https://product.makr.io/' />

      <Page>
        <Container style={{ width: '100vw', margin: '3em 0' }}>
          <Grid
            container
            stackable
            textAlign='center'
            verticalAlign='middle'>
            <Grid.Row style={{ padding: '0.5em' }}>
              <Grid.Column>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Page>
    </div >
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const companiesDirectory = path.join(process.cwd(), '/public/data/companies')
//   const filenames = fs.readdirSync(companiesDirectory)

//   const companies = filenames.map((filename) => {
//     const filePath = path.join(companiesDirectory, filename)
//     const fileContents = fs.readFileSync(filePath, 'utf8')

//     return {
//       filename,
//       data: JSON.parse(fileContents),
//     }
//   })
//   //Shuffle array of companies
//   shuffle(companies);

//   return {
//     props: {
//       companies
//     },
//   }
// }
