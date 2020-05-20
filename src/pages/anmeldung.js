import Airtable from 'airtable'
import Global from 'components/Global'
import PageBody from 'components/PageBody'
import PageTitle from 'components/PageTitle'
import { graphql } from 'gatsby'
import React from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import styled, { css } from 'styled-components'

const requiredCss = css`
  ::after {
    color: red;
    content: '*';
  }
`
const descriptionCss = css`
  font-size: 0.95em;
  color: ${p => p.theme.gray};
`
const errorCss = css`
  color: red;
  display: block;
  margin: 0.5em auto;
`

const Text = styled.span.attrs(p => {
  if (!p.children && !p.html) console.error(`Text missing children and html`)
  if (p.html) return { dangerouslySetInnerHTML: { __html: p.html } }
})`
  ${p => p.required && requiredCss}
  ${p => p.description && descriptionCss}
  ${p => p.error && errorCss}
`

const Input = styled.input`
  height: 2em;
  width: 20em;
  border-radius: 0.3em;
  border: 1px solid ${p => p.theme.lightGray};
  font-size: 1em;
`

const Submit = styled.button.attrs({ type: `submit` })`
  display: block;
  font-size: 1.3em;
  margin: 2em auto;
  background: ${p => p.theme.green};
  color: white;
  border-radius: 0.4em;
  padding: 0.4em 0.6em;
  transition: 0.3s;
  :hover {
    transform: scale(1.03);
    background: ${p => p.theme.darkGreen};
  }
`

const trim = str => str.trim()

export default function SignupPage({ data, location }) {
  let { cover, studentForm, formOptions } = data

  let snippets = studentForm.text.remark.html.split(`<!--`).map(s =>
    s
      .split(/-->|::/)
      .map(trim)
      .filter(str => str)
  )
  snippets = Object.fromEntries(snippets)

  formOptions = formOptions.text.remark.html
    .replace(/(^<!--|-->$)/g, ``) // remove html comments at start and end
    .split(/-->\n?\n?<!--/) // split at all middle html comments
    .map(s => s.split(`::`).map(s => s.split(`;`).map(trim)))
  formOptions = Object.fromEntries(formOptions)

  const baseKeys = Object.fromEntries(
    formOptions.baseKeys.map(s => s.split(`:`).map(trim))
  )
  formOptions.chapters = Object.keys(baseKeys).filter(
    key => ![`test`, `register`].includes(key)
  )
  delete formOptions.baseKeys

  for (const key in formOptions) {
    formOptions[key] = formOptions[key].map(x => ({ value: x, label: x }))
  }

  const { register, handleSubmit, errors, control } = useForm()

  const selectProps = {
    onChange: ([selected]) => selected,
    control,
    as: Select,
  }

  const Error = ({ name }) =>
    errors[name]?.type === `required` && <Text error>{snippets.required}</Text>

  const onSubmit = async data => {
    const fields = {
      'Vor- und Nachname': data.fullname,
      Fächer: data.subjects?.map(x => x.value),
      Telefon: data.phone,
      'E-Mail': data.email,
      Bemerkung: data.remarks,
      'Geografische Präferenz': data.place,
      Klassenstufen: data.levels,
      Schulform: data.schoolTypes?.map(x => x.value),
      Werbemaßnahme: data.discovery?.value,
      Geschlecht: data.gender?.value,
      'Semester Anmeldung': Number(data.semester),
      Studienfach: data.studySubject,
      Geburtsort: data.birthPlace,
      Geburtsdatum: data.birthDate || undefined,
      Datenschutz: data.dataProtection,
    }

    const airtable = new Airtable({
      apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
    })
    const globalBase = airtable.base(baseKeys.register)
    const chapterBase = airtable.base(baseKeys[data.chapter?.value])

    try {
      // use Promise.all to fail fast if one record creation fails
      await Promise.all([
        globalBase(`Studenten`).create(
          [{ fields: { ...fields, Standort: data.chapter?.value } }],
          { typecast: true }
        ),
        chapterBase(`Studenten`).create([{ fields }], { typecast: true }),
      ])
      alert(snippets.success)
    } catch (err) {
      alert(snippets.error + `\n\n` + JSON.stringify(err, null, 4))
    }
  }

  return (
    <Global pageTitle="Anmeldung" path={location.pathname}>
      <PageTitle cover={cover}>
        <h1>{snippets.pageTitle}</h1>
      </PageTitle>
      <PageBody>
        <Text as="section" html={snippets.infoText} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text required as="h2">
            {snippets.chapterTitle}
          </Text>
          <Text description html={snippets.chapter} />
          <Controller
            {...selectProps}
            name="chapter"
            options={formOptions.chapters}
            rules={{ required: true }}
          />

          <Text as="h2" required>
            {snippets.genderTitle}
          </Text>
          <Controller
            {...selectProps}
            name="gender"
            options={formOptions.genders}
            rules={{ required: true }}
          />

          <label>
            <Text as="h2" required>
              {snippets.fullnameTitle}
            </Text>
            <Input type="text" name="fullname" ref={register({ required: true })} />
          </label>
          <Error name="fullname" />

          <label>
            <Text as="h2" required>
              {snippets.phoneTitle}
            </Text>
            <Text description html={snippets.phone} />
            <Input type="phone" name="phone" ref={register({ required: true })} />
          </label>
          <Error name="phone" />

          <label>
            <Text as="h2" required>
              {snippets.emailTitle}
            </Text>
            <Text description html={snippets.email} />

            <Input type="email" name="email" ref={register({ required: true })} />
          </label>
          <Error name="email" />

          <label>
            <Text as="h2">{snippets.studySubjectTitle}</Text>
            <Text description html={snippets.studySubject} />
            <Input type="text" name="studySubject" ref={register} />
          </label>

          <label>
            <Text as="h2">{snippets.semesterTitle}</Text>
            <Text description html={snippets.semester} />
            <Input type="number" name="semester" ref={register} />
          </label>

          <label>
            <Text as="h2">{snippets.birthPlaceTitle}</Text>
            <Text description html={snippets.birthPlace} />
            <Input type="text" name="birthPlace" ref={register} />
          </label>

          <label>
            <Text as="h2">{snippets.birthDateTitle}</Text>
            <Text description html={snippets.birthDate} />
            <Input type="date" name="birthDate" ref={register} />
          </label>

          <Text as="h2" required>
            {snippets.subjectsTitle}
          </Text>
          <Text description html={snippets.subjects} />
          <Controller
            {...selectProps}
            name="subjects"
            options={formOptions.subjects}
            isMulti={true}
            rules={{ required: true }}
          />
          <Error name="subjects" />

          <Text as="h2" required>
            {snippets.schoolTypesTitle}
          </Text>
          <Controller
            {...selectProps}
            name="schoolTypes"
            options={formOptions.schoolTypes}
            isMulti={true}
            rules={{ required: true }}
          />
          <Error name="schoolTypes" />

          <label>
            <Text as="h2">{snippets.levelsTitle}</Text>
            <Text description html={snippets.levels} />
            <Input type="text" name="levels" ref={register} />
          </label>

          <label>
            <Text as="h2" required>
              {snippets.placeTitle}
            </Text>
            <Text description html={snippets.place} />
            <Input type="text" name="place" ref={register({ required: true })} />
          </label>
          <Error name="place" />

          <label>
            <Text as="h2">{snippets.remarksTitle}</Text>
            <Text description html={snippets.remarks} />
            <Input type="text" name="remarks" ref={register} />
          </label>

          <label>
            <Text as="h2" required>
              {snippets.discoveryTitle}
            </Text>
            <Text description html={snippets.discovery} />
            <Controller
              {...selectProps}
              name="discovery"
              options={formOptions.discoveries}
              rules={{ required: true }}
            />
          </label>
          <Error name="discovery" />

          <label>
            <Text as="h2" required>
              {snippets.dataProtectionTitle}
            </Text>
            <input
              name="dataProtection"
              type="checkbox"
              ref={register({ required: true })}
            />
          </label>
          <Text
            description
            html={snippets.dataProtection}
            css="> * { display: inline-block; }"
          />
          <Error name="dataProtection" />

          <Text as="h2">{snippets.submitTitle}</Text>
          <Text description html={snippets.submit} />
          <Submit>Anmeldung abschicken</Submit>
        </form>
      </PageBody>
    </Global>
  )
}

export const query = graphql`
  {
    cover: contentfulAsset(title: { eq: "Contact Banner" }) {
      ...image
    }
    studentForm: contentfulMicrocopy(title: { eq: "StudentForm" }) {
      text {
        remark: childMarkdownRemark {
          html
        }
      }
    }
    formOptions: contentfulMicrocopy(title: { eq: "SignupFormOptions" }) {
      text {
        remark: childMarkdownRemark {
          html
        }
      }
    }
  }
`
