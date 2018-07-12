import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Crumbs = styled.nav`
  margin-bottom: 2rem;
`

const Breadcrumbs = ({ path }) => {
  const crumbs = path.substring(1).split(`/`)
  return <Crumbs>
    <span>Pfad:&ensp;</span>
    {crumbs
      .map((crumb, index) => {
        const prevCrumbs = crumbs.slice(0, index + 1)
        const link = `/` + prevCrumbs.join(`/`)
        return <Link key={crumb} to={link}>{crumb.split(`-`).join(` `)}</Link>
      })
      .reduce((prev, curr) => [prev, ` / `, curr])}
  </Crumbs>
}

export default Breadcrumbs