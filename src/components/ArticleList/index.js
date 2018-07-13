import React, { Fragment } from 'react'
import Link from 'gatsby-link'

import { ArticleGrid, Article } from './styles'

const ArticleList = ({ articles }) => (
  <Fragment>
    <h2>Artikel</h2>
    <ArticleGrid>
      {articles.edges.map(({ node: article }) => {
        const { section, subsection, title, slug, body } = article
        const link = `/wiki/${section.slug}/${subsection.slug}/${slug}`
        return <Article key={title.title}>
          <Link to={link}>
            <h4>{title.title}</h4>
          </Link>
          <h6>Inhaltsverzeichnis</h6>
          <ul>
            {body.data.headings.map(heading =>
              <li key={heading.value}>{heading.value}</li>
            )}
          </ul>
        </Article>
      })}
    </ArticleGrid>
  </Fragment>
)

export default ArticleList