import Airtable from 'airtable'
import PageBody from 'components/PageBody'
import PageTitle from 'components/PageTitle'
import { graphql } from 'gatsby'
import React, { useMemo, useEffect } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { Text, Input, Submit, ButtonGroup, Switch } from 'components/styles/forms'
import { useLocalStorage } from 'hooks'
import { globalHistory } from '@reach/router'

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

const airtable = new Airtable({
  apiKey: process.env.GATSBY_AIRTABLE_API_KEY,
})

export default function SignupPage({ data, location }) {
  let { cover, form, studentForm, pupilForm } = data
  const [storedData, setStoredData] = useLocalStorage(`formData`)

  const { register, handleSubmit, errors, control, watch, getValues } = useForm({
    defaultValues: storedData,
  })

  // For domain changes (site-external navigation)
  useEffect(() => {
    const leaveListener = () => setStoredData(getValues())
    window.addEventListener(`beforeunload`, leaveListener)
    return () => window.removeEventListener(`beforeunload`, leaveListener)
  }, [getValues, setStoredData])

  // For Gatsby route changes (site-internal navigation)
  // https://github.com/reach/router/issues/262
  useEffect(() => {
    // globalHistory.listen returns an unsubscribe function
    return globalHistory.listen(() => setStoredData(getValues()))
  }, [getValues, setStoredData])

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
  const initType = urlParams.get(`type`) || `Student`
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

  const today = new Date()

  const onSubmit = async data => {
    const table = data.type === `Student` ? `Studenten` : `Schüler`
    const global = airtable.base(baseKeys.register)(table)
    const chapter = airtable.base(baseKeys[data.chapter?.value])(table)

    //for pupils calculate approximate birthdate from age
    if (data.age) {
      data.birthDate = `${today.getFullYear() - data.age}-${
        today.getMonth() + 1
      }-${today.getDate()}`
    }
    const fields = {
      'Vor- und Nachname': data.fullname, // for students
      Vorname: data.firstname, // for pupils
      Telefon: data.phone, // for students
      'E-Mail': data.email,
      Bemerkung: data.remarks,
      'Geografische Präferenz': data.place,
      Klassenstufen: data.levels, // for students
      Klassenstufe: data.level, // for pupils
      Fächer: data.subjects?.map(x => x.value),
      Schulform: data.schoolTypes?.map(x => x.value) || data.schoolType?.value, // for pupils
      Werbemaßnahme: data.discovery?.value,
      Geschlecht: data.gender,
      'Semester Anmeldung': Number(data.semester) || undefined, // for students
      // pass undefined in case Number(data.semester) is NaN
      Studienfach: data.studySubject, // for students
      Geburtsort: data.birthPlace, // for students
      Geburtsdatum: data.age ? data.birthDate : undefined, // for students
      Datenschutz: data.dataProtection,
      Kontaktperson: data.nameContact, // for pupils
      'E-Mail Kontaktperson': data.emailContact, // for pupils
      'Telefon Kontaktperson': data.phoneContact, // for pupils
      'Organisation Kontaktperson': data.orgContact, // for pupils
    }

    //Certain chapters organize contact persons a bit different to others
    if (data.chapter?.value === `Halle` && table === `Schüler`) {
      fields.Kontaktperson = data.nameContact
        ? `${data.nameContact}; ${data.orgContact}; ${data.emailContact}; ${data.phoneContact}`
        : undefined
      fields['E-Mail Kontaktperson'] = undefined
      fields['Telefon Kontaktperson'] = undefined
      fields['Organisation Kontaktperson'] = undefined
    }
    try {
      // use Promise.all to fail fast if one record creation fails
      await Promise.all([
        global.create([{ fields: { ...fields, Standort: data.chapter?.value } }], {
          typecast: true,
        }),

        chapter.create([{ fields }], { typecast: true }),
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
        <Error name="gender" />

        {type === `Student` && (
          <>
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
              {snippets.agreementTitle}
            </Text>
            <Text description html={snippets.agreement} />
            <Switch name="agreement" register={register({ required: true })} />
            <Error name="agreement" />
          </>
        )}
        {type === `Schüler` && (
          <>
            <Text as="h2" required>
              {snippets.firstnameTitle}
            </Text>
            <Text description html={snippets.firstname} />
            <Input type="text" name="firstname" ref={register({ required: true })} />
            <Error name="firstname" />

            <Text as="h2" required>
              {snippets.schoolTypeTitle}
            </Text>
            <Text description html={snippets.schoolType} />
            <Controller
              {...selectProps}
              name="schoolType"
              options={form.schoolTypes}
              rules={{ required: true }}
            />
            <Error name="schoolType" />

            <Text as="h2" required>
              {snippets.levelTitle}
            </Text>
            <Text description html={snippets.level} />
            <Input type="text" name="level" ref={register({ required: true })} />

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
              {snippets.placeTitle}
            </Text>
            <Text description html={snippets.place} />
            <Input type="text" name="place" ref={register({ required: true })} />
            <Error name="place" />

            <Text as="h2">{snippets.remarksTitle}</Text>
            <Text description html={snippets.remarks} />
            <Input type="text" name="remarks" ref={register} />

            <Text as="h2">{snippets.ageTitle}</Text>
            <Text description html={snippets.age} />
            <Input type="number" name="age" ref={register} />

            <Text as="h2" required>
              {snippets.nameContactTitle}
            </Text>
            <Text description html={snippets.nameContact} />
            <Input
              type="text"
              name="nameContact"
              ref={register({ required: true })}
            />
            <Error name="nameContact" />

            <Text as="h2" required>
              {snippets.phoneContactTitle}
            </Text>
            <Text description html={snippets.phoneContact} />
            <Input
              type="phone"
              name="phoneContact"
              ref={register({ required: true })}
            />
            <Error name="phoneContact" />

            <Text as="h2" required>
              {snippets.emailContactTitle}
            </Text>
            <Text description html={snippets.emailContact} />
            <Input
              type="email"
              name="emailContact"
              ref={register({ required: true })}
            />
            <Error name="emailContact" />

            <Text as="h2" required>
              {snippets.orgContactTitle}
            </Text>
            <Text description html={snippets.orgContact} />
            <Input
              type="text"
              name="orgContact"
              ref={register({ required: true })}
            />
            <Error name="orgContact" />
          </>
        )}
        <Text as="h2" required>
          {snippets.dataProtectionTitle}
        </Text>
        <Text description html={snippets.dataProtection} />
        <Switch name="dataProtection" register={register({ required: true })} />
        <Error name="dataProtection" />

        {type === `Schüler` && (
          <>
            <Text as="h2" required>
              {snippets.needTitle}
            </Text>
            <Text description html={snippets.need} />
            <Switch name="need" register={register({ required: true })} />
            <Error name="need" />
          </>
        )}
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
