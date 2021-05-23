const fs = require('fs');
const globby = require('globby');
const path = require('path');

async function generateSiteMap() {
  const portfolioFilePath = path.join(process.cwd(), '/data/me.json');
  const fileContents = fs.readFileSync(portfolioFilePath, 'utf8');
  const portfolio = JSON.parse(fileContents);

  //Load project paths from portfolio json file
  const projectPaths = await portfolio.projects.map((project) => {
    return `/projects/${project.slug}`
  });

  //Load all next page paths + md file paths
  const filePaths = await globby([
    'pages/**/*.tsx',
    '!pages/_*.tsx',
    '!pages/404.tsx',
    '!pages/500.tsx',
    '!pages/**/[project].tsx',
    '!pages/**/[highlight].tsx',
    '!pages/api',
    'data/md/highlights/*.md'
  ])

  //Combine page paths & project paths
  const pages = filePaths.concat(projectPaths)

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