import { Grid, Segment, Sticky } from 'semantic-ui-react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Carte from './components/Carte/Carte'
import ModalInscription from './components/Modales/ModalInscription'
import ModalCGI from './components/Modales/ModalCGI'
import styles from './App.module.css'
import { useState, useEffect } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase/firebase'
import { addDoc, getDocs, collection } from 'firebase/firestore'
import { db } from './firebase/firebase.js'

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [openModalCGI, setOpenModalCGI] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'))
        const cards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(cards)
      } catch (e) {
        setError(e.message)
      }
    }
    getProfiles()
  }, [profiles])

  const handleSubmit = (profile, skillsList, file) => {
    let filteredSkillsList = skillsList.filter(skill => skill.name !== '')
    filteredSkillsList = filteredSkillsList ?? [{ name: '', rating: null }]
    setProfiles([
      ...profiles,
      { ...profile, photo: file?.name, skills: filteredSkillsList },
    ])
    setOpenModal(false)
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
      const profilRef = await addDoc(collection(db, 'profiles'), {
        ...profile,
        photo: url,
        skills: skillsList,
      })
      setSubmitted(val => !val)
    } catch (e) {
      setError(e.message)
    }
  }
  submit()

  return (
    <div className={styles.container}>
      <Sticky>
        <Header openModal={() => setOpenModal(true)}></Header>
      </Sticky>

      <ModalInscription
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmit={handleSubmit}
      />
      <Grid
        className={styles.content}
        stackable
        style={{
          margin: '5rem 0',
        }}
      >
        {data.map((profil, i) => {
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
      <ModalCGI openModal={openModalCGI} setOpenModal={setOpenModalCGI} />
      <Footer openModal={() => setOpenModalCGI(true)} />
    </div>
  )
}

export default App
