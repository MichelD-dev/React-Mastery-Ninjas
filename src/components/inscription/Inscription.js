import {
  Button,
  Container,
  Form,
  Rating,
  Segment,
  Image,
  TextArea,
  Label,
} from 'semantic-ui-react'
import Input from './Input'

import { useDropzone } from 'react-dropzone'
import { useEffect, useRef, useState } from 'react'

const Inscription = ({ handleSubmit }) => {
  const [skillsList, setSkillsList] = useState([{ name: '', rating: null }])
  const [inputNameError, setInputNameError] = useState('')
  const [inputSkillEmpty, setInputSkillEmpty] = useState('')
  const [profile, setProfile] = useState({
    name: '',
    presentation: '',
  })
  const [file, setFile] = useState(null)
  const [termsChecked, setTermsChecked] = useState(false)
  const [checkBoxError, setCheckBoxError] = useState(false)
  const [addedFieldError, setAddedFieldError] = useState(false)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const nameInputRef = useRef()

  useEffect(() => nameInputRef.current.focus(), [])

  // eslint-disable-next-line no-unused-vars
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const onSubmitHandler = e => {
    e.preventDefault()
    if (!termsChecked) {
      setCheckBoxError(true)
      return
    }
    handleSubmit(profile, skillsList, file)
  }

  const handleFile = e => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const ajouterSkill = e => {
    e.preventDefault()
    if (skillsList[0].name === '') {
      setAddedFieldError(true)
      setInputSkillEmpty('Veuillez indiquer au moins un langage')
      return
    }
    setSkillsList([...skillsList, { name: '', rating: null }])
  }

  const retoucherSkill = (newSkill, indexToModify) => {
    // const retoucherSkill = (newSkill={name:'', rating: null}, indexToModify) => { //TODO alternative pour probleme champ vide?
    setSkillsList(
      skillsList.map((skill, index) => {
        if (index !== indexToModify) return skill
        return { ...skill, ...newSkill }
      })
    )
  }

  const isValueEntered = ref => {
    if (ref.currentTarget.value === '' && !addedFieldError) {
      setInputNameError('Veuillez remplir ce champ')
      ref.currentTarget.focus()
    } else {
      setInputNameError('')
    }
  }

  return (
    <Container text>
      <Form onSubmit={onSubmitHandler}>
        {/*------------------------------------NAME----------------------------------- */}

        <Form.Field required>
          <label htmlFor='name'>Votre nom</label>
          <Input
            name='name'
            id='name'
            ref={nameInputRef}
            onChange={e => {
              setProfile({ ...profile, name: e.target.value })
              setInputNameError('')
            }}
            onBlur={isValueEntered}
            value={profile.name}
            error={inputNameError}
          />
        </Form.Field>

        {/*------------------------------------PHOTO----------------------------------- */}

        <Form.Field>
          <label>Votre photo:</label>
          <Segment style={{ cursor: 'pointer' }}>
            <div
              {...getRootProps({ className: 'dropzone' })}
              style={{
                minHeight: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <input {...getInputProps()} onChange={handleFile} />
              {file ? (
                <Image>
                  <img src={`${URL.createObjectURL(file)}`} alt='avatar' />
                </Image>
              ) : (
                <h4
                  style={{
                    color: '#666',
                    textAlign: 'center',
                    marginTop: '0px',
                  }}
                >
                  <i className='images outline huge disabled icon ' />
                </h4>
              )}
            </div>
          </Segment>
        </Form.Field>

        {/*---------------------------------PRESENTATION-------------------------------- */}

        <Form.Field>
          <label>Présentation</label>{' '}
          <TextArea
            onChange={e =>
              setProfile({ ...profile, presentation: e.target.value })
            }
            value={profile.presentation}
          />
        </Form.Field>

        {/*------------------------------------SKILLS----------------------------------- */}

        <Form.Field>
          <label>Vos langages connus:</label>
          {skillsList.map((skill, i) => {
            return (
              <Segment
                key={`name${i}`}
                size='mini'
                style={{ padding: '0 1rem', marginTop: '0' }}
              >
                <Form.Group
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 0,
                  }}
                >
                  <Input
                    style={{
                      maxWidth: '50%',
                      fontSize: '1rem',
                      padding: '.7rem',
                    }}
                    name='skill'
                    value={skill.name}
                    onChange={e => {
                      setAddedFieldError(false)
                      retoucherSkill({ ...skill, name: e.target.value }, i)
                    }}
                  />
                  {addedFieldError && (
                    <Label pointing='left' prompt>
                      {inputSkillEmpty}
                    </Label>
                  )}
                  <Rating
                    icon='star'
                    maxRating={5}
                    onRate={(e, { rating }) => {
                      retoucherSkill({ ...skill, rating: rating || 0 }, i)
                    }}
                    size='huge'
                  />
                </Form.Group>
              </Segment>
            )
          })}
          <Button
            type='button'
            fluid
            onClick={ajouterSkill}
            content='Ajouter un langage'
          />
          <Form.Field style={{ marginTop: '3rem' }}>
            <Form.Checkbox
              error={
                checkBoxError && {
                  content: "Vous devez accepter les conditions d'utilisation",
                  pointing: 'left',
                }
              }
              label="Je souscris aux conditions d'utilisation"
              onChange={() => {
                setTermsChecked(true)
                setCheckBoxError(false)
              }}
              checked={termsChecked}
              required
            />
          </Form.Field>
        </Form.Field>
        <Button
          style={{ marginTop: '2rem' }}
          positive
          content="Yep, that's me"
        />
      </Form>
    </Container>
  )
}

export default Inscription
