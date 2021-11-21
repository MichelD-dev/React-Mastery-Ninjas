import { Grid, Sticky } from 'semantic-ui-react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Carte from './components/Carte/Carte'
import ModalInscription from './components/Modales/ModalInscription'
import ModalCGI from './components/Modales/ModalCGI'
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
    setProfiles([
      ...profiles,
      { ...profile, photo: file?.name, skills: skillsList },
    ])
    setOpenModal(false)
    submit(profile, skillsList, file)
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
          margin: '5rem auto',
          width: '90%',
        }}
      >
        {data.map((profil, i) => {
          return (
            <Grid.Column key={profil.id} mobile={16} tablet={8} computer={4}>
              <Carte profil={profil} />
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
