import React from 'react';
import Page from '../../components/page';
import Meta from '../../components/Meta';
import fs from 'fs';
import path from 'path';
import { Portfolio } from '../../types/portfolio.types';
import { GetStaticProps, GetStaticPaths } from 'next';

  //TODO update portfolio object for dynamic PM portfolio
export default function ProductPage({ project }: { project: any }) {

  return (
    <>
      <Meta
        title='Portfolio Not Found'
        desc={project.summary}
        canonical={`https://product.makr.io/${project.slug}`}
        image='' />

      <Page>
        <ProductContainer portfolio={portfolio} />
      </Page>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const companiesDirectory = path.join(process.cwd(), '/public/data/companies')
//   const filenames = fs.readdirSync(companiesDirectory)

//   const paths = filenames.map((filename) => {
//     const filePath = path.join(companiesDirectory, filename)
//     const fileContents = fs.readFileSync(filePath, 'utf8')
//     const slug = JSON.parse(fileContents).slug

//     return {
//       params: {
//         portfolio: slug
//       }
//     }
//   })
//   return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async context => {
//   const portfolioFile = path.join(process.cwd(), `/public/data/companies/${context.params.portfolio}.json`)
//   const fileContents = fs.readFileSync(portfolioFile, 'utf8')

//   return {
//     props: {
//       portfolio: JSON.parse(fileContents)
//     },
//   }
// }