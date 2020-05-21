import Airtable from 'airtable'
import PageBody from 'components/PageBody'
import PageTitle from 'components/PageTitle'
import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { Text, Input, Submit, ButtonGroup } from 'components/styles/forms'

const RadioButtons = ({ options, name, register, initial, ...rest }) => (
  <ButtonGroup {...rest}>
    {options.map(({ label, value }) => (
      <label key={label}>
        <input
          type="radio"
          {...{ name, value }}
          ref={register}
          defaultChecked={value === initial}
        />
        <span>{label}</span>
      </label>
    ))}
  </ButtonGroup>
)

const trim = str => str.trim()
const parseSnippets = html => {
  const snippets = html.split(`<!--`).map(s =>
    s
      .split(/-->|::/)
      .map(trim)
      .filter(str => str)
  )
  return Object.fromEntries(snippets)
}

export default function SignupPage({ data, location }) {
  let { cover, form, studentForm, pupilForm } = data

  const { register, handleSubmit, errors, control, watch } = useForm()

  form = form.text.remark.html
    .replace(/(^<!--|-->$)/g, ``) // remove html comments at start and end
    .split(/-->\n?\n?<!--/) // split at all middle html comments
    .map(s => s.split(`::`).map(s => s.split(`;`).map(trim)))
  form = Object.fromEntries(form)

  const baseKeys = Object.fromEntries(form.baseKeys.map(s => s.split(`:`).map(trim)))
  form.chapters = Object.keys(baseKeys).filter(
    key => ![`test`, `register`].includes(key)
  )
  delete form.baseKeys

  // initChapter should remain between parsing `form` above and turning items
  // into { label, value } objects below for chapters.includes to work.
  const urlParams = new URLSearchParams(location.search)
  const initType = urlParams.get(`type`)
  let initChapter = urlParams.get(`chapter`)
  initChapter = form.chapters.includes(initChapter) && {
    label: initChapter,
    value: initChapter,
  }

  const type = watch(`type`, initType || `Student`)

  let snippets = useMemo(
    () =>
      parseSnippets((type === `Student` ? studentForm : pupilForm).text.remark.html),
    [pupilForm, studentForm, type]
  )

  for (const key in form) {
    form[key] = form[key].map(x => ({ value: x, label: x }))
  }

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
    <>
      <PageTitle cover={cover}>
        <h1>{snippets.pageTitle}</h1>
      </PageTitle>
      <PageBody as="form" onSubmit={handleSubmit(onSubmit)}>
        <RadioButtons
          options={form.types}
          register={register}
          name="type"
          initial={initType}
          css="margin: 0 auto 4em;"
        />
        <Text as="section" html={snippets.infoText} />

        <Text required as="h2">
          {snippets.chapterTitle}
        </Text>
        <Text description html={snippets.chapter} />
        <Controller
          {...selectProps}
          name="chapter"
          options={form.chapters}
          rules={{ required: true }}
          defaultValue={initChapter}
        />

        <Text as="h2" required>
          {snippets.genderTitle}
        </Text>
        <RadioButtons options={form.genders} register={register} name="gender" />

        <Text as="h2" required>
          {snippets.fullnameTitle}
        </Text>
        <Input type="text" name="fullname" ref={register({ required: true })} />
        <Error name="fullname" />

        <Text as="h2" required>
          {snippets.phoneTitle}
        </Text>
        <Text description html={snippets.phone} />
        <Input type="phone" name="phone" ref={register({ required: true })} />
        <Error name="phone" />

        <Text as="h2" required>
          {snippets.emailTitle}
        </Text>
        <Text description html={snippets.email} />

        <Input type="email" name="email" ref={register({ required: true })} />
        <Error name="email" />

        <Text as="h2">{snippets.studySubjectTitle}</Text>
        <Text description html={snippets.studySubject} />
        <Input type="text" name="studySubject" ref={register} />

        <Text as="h2">{snippets.semesterTitle}</Text>
        <Text description html={snippets.semester} />
        <Input type="number" name="semester" ref={register} />

        <Text as="h2">{snippets.birthPlaceTitle}</Text>
        <Text description html={snippets.birthPlace} />
        <Input type="text" name="birthPlace" ref={register} />

        <Text as="h2">{snippets.birthDateTitle}</Text>
        <Text description html={snippets.birthDate} />
        <Input type="date" name="birthDate" ref={register} />

        <Text as="h2" required>
          {snippets.subjectsTitle}
        </Text>
        <Text description html={snippets.subjects} />
        <Controller
          {...selectProps}
          name="subjects"
          options={form.subjects}
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
          options={form.schoolTypes}
          isMulti={true}
          rules={{ required: true }}
        />
        <Error name="schoolTypes" />

        <Text as="h2">{snippets.levelsTitle}</Text>
        <Text description html={snippets.levels} />
        <Input type="text" name="levels" ref={register} />

        <Text as="h2" required>
          {snippets.placeTitle}
        </Text>
        <Text description html={snippets.place} />
        <Input type="text" name="place" ref={register({ required: true })} />
        <Error name="place" />

        <Text as="h2">{snippets.remarksTitle}</Text>
        <Text description html={snippets.remarks} />
        <Input type="text" name="remarks" ref={register} />

        <Text as="h2" required>
          {snippets.discoveryTitle}
        </Text>
        <Text description html={snippets.discovery} />
        <Controller
          {...selectProps}
          name="discovery"
          options={form.discoveries}
          rules={{ required: true }}
        />
        <Error name="discovery" />

        <Text as="h2" required>
          {snippets.dataProtectionTitle}
        </Text>
        <div>
          <input
            name="dataProtection"
            type="checkbox"
            ref={register({ required: true })}
          />
          <Text
            description
            html={snippets.dataProtection}
            css="> * { display: inline-block; }"
          />
        </div>
        <Error name="dataProtection" />

        <Text as="h2">{snippets.submitTitle}</Text>
        <Text description html={snippets.submit} />
        <Submit>Anmeldung abschicken</Submit>
      </PageBody>
    </>
  )
}

export const query = graphql`
  fragment microcopy on ContentfulMicrocopy {
    text {
      remark: childMarkdownRemark {
        html
      }
    }
  }
  {
    cover: contentfulAsset(title: { eq: "Contact Banner" }) {
      ...image
    }
    studentForm: contentfulMicrocopy(title: { eq: "StudentForm" }) {
      ...microcopy
    }
    pupilForm: contentfulMicrocopy(title: { eq: "PupilForm" }) {
      ...microcopy
    }
    form: contentfulMicrocopy(title: { eq: "SignupFormOptions" }) {
      ...microcopy
    }
  }
`
