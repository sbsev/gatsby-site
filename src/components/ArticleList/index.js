import React from 'react'
import { Link } from 'gatsby'

import { ArticleGrid, Article } from './styles'

const ArticleList = ({ articles }) => (
  <>
    <h2>Artikel</h2>
    <ArticleGrid>
      {articles.edges.map(({ node: article }) => {
        const { section, subsection, title, slug, body } = article
        const link = `/wiki/${section.slug}${subsection &&
          `/` + subsection.slug}/${slug}`
        return (
          <Article key={title}>
            <Link to={link}>
              <h4>{title}</h4>
            </Link>
            <h6>Inhaltsverzeichnis</h6>
            <ul>
              {body.remark.headings.map(heading => (
                <li key={heading.value}>{heading.value}</li>
              ))}
            </ul>
          </Article>
        )
      })}
    </ArticleGrid>
  </>
)

export default ArticleList
