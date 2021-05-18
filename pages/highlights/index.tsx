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
import { Portfolio } from '../../types/portfolio.types';
import { GetStaticProps } from 'next';

export default function Highlights({ portfolio }: { portfolio: Portfolio }) {

  return (
    <div>
      <Meta
        title={`Highlights | ${portfolio.name}`}
        desc={`${portfolio.name}'s Blog & Case Highlights`}
        canonical={`${process.env.PUBLIC_URL}/highlights`} />

      <Page portfolio={portfolio}>

      </Page>
    </div >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dataDirectory = path.join(process.cwd(), '/data')
  const filename = 'me.json'

  const filePath = path.join(dataDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const portfolio = JSON.parse(fileContents)

  return {
    props: {
      portfolio
    }
  }
}
