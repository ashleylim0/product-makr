const fs = require('fs');
const globby = require('globby');

async function generateSiteMap() {
  const pages = await globby([
    'pages/**/*.tsx',
    '!pages/_*.tsx',
    '!pages/404.tsx',
    '!pages/500.tsx',
    '!pages/**/[project].tsx',
    '!pages/**/[highlight].tsx',
    '!pages/api',
    'data/md/highlights/*.md',
    'data/md/projects/*.md'
  ])

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
      .map(page => {
        const path = page
          .replace('pages', '')
          .replace('.json', '')
          .replace('.tsx', '')
          .replace('.jsx', '')
          .replace('.js', '')
          .replace('.md', '')
          .replace('data/md/highlights', '/highlights')
          .replace('data/md/projects', '/projects')
          .replace('data/md', '')
          .replace('projects/index', 'projects')
          .replace('highlights/index', 'highlights')

        const route = path === '/index' ? '' : path

        return `
                      <url>
                          <loc>${process.env.PUBLIC_URL}${route}</loc>
                      </url>
                  `
      })
      .join('')}
      </urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSiteMap();