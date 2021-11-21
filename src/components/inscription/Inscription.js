import {
  Button,
  Container,
  Form,
  Rating,
  Segment,
  Image,
  TextArea,
} from 'semantic-ui-react'
import Input from './Input'

import { useDropzone } from 'react-dropzone'
import { useEffect, useRef, useState } from 'react'

const Inscription = ({ handleSubmit }) => {
  const [isRequired, setIsRequired] = useState(true)
  const [skillsList, setSkillsList] = useState([{ name: '', rating: null }])
  const [inputError, setInputError] = useState('')
  const [rate, setRate] = useState()
  const [profile, setProfile] = useState({
    name: '',
    presentation: '',
  })
  const [file, setFile] = useState(null)
  const [termsChecked, setTermsChecked] = useState(false)
  const [checkBoxError, setCheckBoxError] = useState(false)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const inputRef = useRef()

  useEffect(() => inputRef.current.focus(), [])

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
    setSkillsList([...skillsList, { name: '', rating: null }])
  }

  const retoucherSkill = (newSkill, indexToModify) => {
    setSkillsList(
      skillsList.map((skill, index) => {
        if (index !== indexToModify) return skill
        return { ...skill, ...newSkill }
      })
    )
  }

  const isValueEntered = ref => {
    if (isRequired && profile.name === '') {
      setInputError('Veuillez remplir ce champ')
      ref.currentTarget.focus()
    } else {
      setIsRequired(false)
      setInputError('')
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
            ref={inputRef}
            onChange={e => {
              setProfile({ ...profile, name: e.target.value })
              setInputError('')
            }}
            onBlur={isValueEntered} //FIXME pas d'alerte si on efface le champ
            value={profile.name}
            error={inputError}
          />
        </Form.Field>

        {/*------------------------------------PHOTO----------------------------------- */}

        <Form.Field>
          <label>Votre photo:</label>
          <Segment>
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
                size='mini'
                style={{ padding: '0 1rem', marginTop: '0' }}
              >
                <Form.Group
                  key={`name${i}`}
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
                    onChange={e =>
                      retoucherSkill(
                        { ...skill, name: e.currentTarget.value },
                        i
                      )
                    }
                  />

                  <Rating
                    icon='star'
                    defaultRating={0}
                    maxRating={5}
                    onRate={(e, { rating }) => {
                      setRate({ rating })
                      retoucherSkill({ ...skill, rating: (rate || 0) }, i) //FIXME pas de rerender => rating :rate est undefined
                    }}
                    size='huge'
                  />
                </Form.Group>
              </Segment>
            )
          })}
          <Button fluid onClick={ajouterSkill}>
            Ajouter un langage
          </Button>

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
        <Button style={{ marginTop: '2rem' }} positive>
          Yep, that's me
        </Button>
      </Form>
    </Container>
  )
}

export default Inscription
