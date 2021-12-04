import { Grid, Segment, Sticky } from 'semantic-ui-react'
import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import Carte from 'components/Carte/Carte'
import ModalInscription from 'components/Modales/ModalInscription'
import ModalCGI from 'components/Modales/ModalCGI'
import styles from './App.module.css'
import { useEffect, useReducer } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from 'firebase/firebase'
import { addDoc, getDocs, collection } from 'firebase/firestore'
import { db } from 'firebase/firebase.js'

const initialState = {
  openModal: false,
  openModalCGI: false,
  error: '',
  data: [],
  profiles: [],
}

const reducer = (state, action) => ({ ...state, ...action })

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [, toggleSubmitted] = useReducer(val => !val, false)

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'))
        const cards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        dispatch({ data: cards })
      } catch (e) {
        dispatch({ error: e.message })
      }
    }
    getProfiles()
  }, [state.profiles])

  const handleSubmit = (profile, skillsList, file) => {
    let filteredSkillsList = skillsList.filter(skill => skill.name !== '')
    filteredSkillsList = filteredSkillsList ?? [{ name: '', rating: null }]
    dispatch({
      profiles: [
        ...state.profiles,
        { ...profile, photo: file?.name, skills: filteredSkillsList },
      ],
    })
    dispatch({ openModal: false })
    submit(profile, filteredSkillsList, file)
  }

  const submit = async (profile, skillsList, file) => {
    try {
      // on crée une référence vers le fichier dans firebase
      const imgRef = file && ref(storage, file.name)

      // On upload l'image
      const snapshot = file && (await uploadBytes(imgRef, file))

      // On récupère le lien (l'url de l'image)
      const url = file && (await getDownloadURL(snapshot.ref))
      // eslint-disable-next-line no-unused-vars
      const profilRef = await addDoc(collection(db, 'profiles'), {
      
        ...profile,
        photo: url,
        skills: skillsList,
      })
      toggleSubmitted()
    } catch (e) {
      dispatch({ error: e.message })
    }
  }

  return (
    <div className={styles.container}>
      <Sticky>
        <Header openModal={() => dispatch({ openModal: true })}></Header>
      </Sticky>

      <ModalInscription
        openModal={state.openModal}
        dispatch={dispatch}
        handleSubmit={handleSubmit}
      />
      <Grid
        className={styles.content}
        stackable
        style={{
          margin: '5rem 0',
        }}
      >
        {state.data.map(profil => {
          return (
            <Grid.Column key={profil.id} mobile={16} tablet={8} computer={4}>
              <Segment
                basic
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Carte profil={profil} />
              </Segment>
            </Grid.Column>
          )
        })}
      </Grid>
      <ModalCGI openModal={state.openModalCGI} dispatch={dispatch} />
      <Footer openModal={() => dispatch({ openModalCGI: true })} />
    </div>
  )
}

export default App
