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
import { useEffect, useReducer, useRef } from 'react'

const initialState = {
  profile: {
    name: '',
    presentation: '',
  },
  skillsList: [{ name: '', rating: null }],
  inputNameError: '',
  file: null,
  termsChecked: false,
  checkBoxError: false,
  addedFieldError: '',
}

const reducer = (state, action) => ({ ...state, ...action })

const Inscription = ({ handleSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
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
    if (!state.termsChecked) {
      dispatch({ checkBoxError: true })
      return
    }
    handleSubmit(state.profile, state.skillsList, state.file)
  }

  const handleFile = e => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      dispatch({ file: e.target.files[0] })
    }
  }

  const ajouterSkill = () => {
    if (state.skillsList[0].name === '') {
      dispatch({ addedFieldError: 'Veuillez indiquer au moins un langage' })
      return
    }
    dispatch({ skillsList: [...state.skillsList, { name: '', rating: null }] })
  }

  const retoucherSkill = (newSkill, indexToModify) => {
    dispatch({
      skillsList: state.skillsList.map((skill, index) => {
        if (index !== indexToModify) return skill
        return { ...skill, ...newSkill }
      }),
    })
  }

  const isValueEntered = ref => {
    if (ref.currentTarget.value === '') {
      dispatch({ inputNameError: 'Veuillez remplir ce champ' })
      ref.currentTarget.focus()
    } else {
      dispatch({ inputNameError: '' })
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
              dispatch({ profile: { ...state.profile, name: e.target.value } })
              dispatch({ inputNameError: '' })
            }}
            onBlur={isValueEntered}
            value={state.profile.name}
            error={state.inputNameError}
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
              {state.file ? (
                <Image>
                  <img
                    src={`${URL.createObjectURL(state.file)}`}
                    alt='avatar'
                  />
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
              dispatch({
                profile: { ...state.profile, presentation: e.target.value },
              })
            }
            value={state.profile.presentation}
          />
        </Form.Field>

        {/*------------------------------------SKILLS----------------------------------- */}

        <Form.Field>
          <label>Vos langages connus:</label>
          {state.skillsList.map((skill, i) => {
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
                      dispatch({ addedFieldError: '' })
                      retoucherSkill({ ...skill, name: e.target.value }, i)
                    }}
                  />
                  {state.addedFieldError && (
                    <Label pointing='left' prompt>
                      {state.addedFieldError}
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
                state.checkBoxError && {
                  content: "Vous devez accepter les conditions d'utilisation",
                  pointing: 'left',
                }
              }
              label="Je souscris aux conditions d'utilisation"
              onChange={() => {
                dispatch({ termsChecked: true })
                dispatch({ checkBoxError: false })
              }}
              checked={state.termsChecked}
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
