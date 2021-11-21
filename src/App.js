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
  const [profiles, setProfiles] = useState([
    // {
    //   name: 'MichelD',
    //   photo: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
    //   skills: [
    //     { name: 'html/css', rating: 4 },
    //     { name: 'js', rating: 3 },
    //     { name: 'php', rating: 4 },
    //     { name: 'react', rating: 4 },
    //   ],
    // },
    // {
    //   name: 'Dummy (de passage...)',
    //   photo: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
    //   skills: [
    //     { name: 'html', rating: 2 },
    //     { name: 'css', rating: 1 },
    //     { name: 'js', rating: 3 },
    //   ],
    //   presentation:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque mollitia deserunt ut delectus rerum dolor reprehenderit, quidem repudiandae aut nostrum! Iure quos itaque possimus at repudiandae eum, accusamus mollitia saepe.',
    // },
  ])

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'))
        const cards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(cards)
        console.log(cards)
      } catch (e) {
        setError(e.message)
      }
    }
    getProfiles()
  }, [])

  const handleSubmit = (profile, skillsList, file) => {
    console.log(file.name)
    setProfiles([
      ...profiles,
      { ...profile, photo: file.name, skills: skillsList },
    ])
    setOpenModal(false)
    submit(profile, skillsList, file)
  }

  const submit = async (profile, skillsList, file) => {
    try {
      if (!file)
        return {
          /*FIXME  Pas d'envoi si pas d'image...*/
        }

      // on crée une référence vers le fichier dans firebase
      const imgRef = ref(storage, file.name)

      // On upload l'image
      const snapshot = await uploadBytes(imgRef, file)

      // On récupère le lien (l'url de l'image)
      const url = await getDownloadURL(snapshot.ref)
      const profil = await addDoc(collection(db, 'profiles'), {
        ...profile,
        photo: url,
        skills: skillsList,
      })
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
        {data.map((profil, i) => (
          <Grid.Column
            key={`${profil.name}${i}`}
            mobile={16}
            tablet={8}
            computer={4}
          >
            <Carte profil={profil} />
          </Grid.Column>
        ))}
      </Grid>

      <ModalCGI openModal={openModalCGI} setOpenModal={setOpenModalCGI} />
      {error && <p>{error}</p>}
      {/* //FIXME */}
      <Footer openModal={() => setOpenModalCGI(true)} />
    </div>
  )
}

export default App
