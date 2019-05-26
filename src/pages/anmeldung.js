import React, { useRef, useState, useEffect } from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import PageBody from "../components/PageBody"
import { ButtonGroup } from "../components/styles"

const forms = {
  students: `shr4s9vHgtEfQ9bSN`,
  pupils: `shr6vD3iBQtdwmxQq`,
}

const parseUrlParams = params => [
  params.replace(/.*form=([^&]+).*/, `$1`),
  params.replace(/.*chapter=([^&]+).*/, `$1`),
]

const handleButtonClick = setForm => form => () => {
  setForm(form)
  history.replaceState(
    { activeForm: form },
    `active Form: ${form}`,
    `/anmeldung?form=${form}`
  )
}

const embedResizeHandler = ref => event =>
  event.data &&
  event.data.key === `airtableEmbedContentDidResize` &&
  (ref.current.height = event.data.height + 100)

export default function SignupPage({ data, location }) {
  const { title, cover, body } = data.page
  const { excerpt } = body.remark
  const [urlForm, chapter] = parseUrlParams(location.search)
  const [form, setForm] = useState(urlForm || `students`)
  const ref = useRef()
  useEffect(() => {
    window.addEventListener(`message`, embedResizeHandler(ref))
    return () => window.removeEventListener(`message`, embedResizeHandler(ref))
  })
  const iFrameSrc = `https://airtable.com/embed/${
    forms[form]
  }?prefill_Standort=${chapter}`
  const buttonProps = formName => ({
    className: form === formName ? `active` : null,
    onClick: handleButtonClick(setForm)(formName),
  })
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle
        images={cover && cover.map(({ img, ...rest }) => ({ ...img, ...rest }))}
      >
        <h1>{title}</h1>
      </PageTitle>
      <PageBody>
        <ButtonGroup css="margin-top: 0;">
          <button {...buttonProps(`students`)}>Studenten</button>
          <button {...buttonProps(`pupils`)}>Schüler</button>
        </ButtonGroup>
        <iframe
          ref={ref}
          src={iFrameSrc}
          css="border: none; width: 100%; min-height: 80vh;"
        />
      </PageBody>
    </Global>
  )
}

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "anmeldung" }) {
      ...pageFields
    }
  }
`
