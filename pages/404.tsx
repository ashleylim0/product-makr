import Page from '../components/page';
import Meta from '../components/Meta';
import { Portfolio } from '../types/portfolio.types';
import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';

export default function Custom404({ portfolio }: {
    portfolio: Portfolio
}) {

    return (
        <>
            <Meta title='404 | Page Not Found' />
            <Page portfolio={portfolio}>
                <div style={{ minHeight: '70vh' }}>
                    <h1 style={{
                        margin: '0',
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        msTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)'
                    }}>404 | Page Not Found</h1>
                </div>
            </Page>
        </>
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