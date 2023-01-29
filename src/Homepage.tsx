import { collection, addDoc, getDoc, doc, onSnapshot } from '@firebase/firestore'
import React, { useState } from 'react'
import { firestore } from '../src/firebase'
import './App.css'

const Homepage = () => {
  const [message, setMessage] = useState('')
  const usersRef = collection(firestore, 'users')
  const usersDoc = doc(firestore, 'users')
  const readDataUser = () => {
    const getData = getDoc(usersDoc)
    onSnapshot(usersDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const dataUsers = docSnapshot.data()
        console.log(dataUsers)
      }
    })
    console.log(getData)
  }
  const handleSave = async (e: any) => {
    e.preventDefault()
    //   try {
    //     let dataUser = {
    //       firstName: 'Maria',
    //       lastName: 'Popescu',
    //       numberPhone: '0764454567',
    //     }
    //     addDoc(usersRef, dataUser)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    readDataUser()
  }

  return (
    <>
      <div>Homepage</div>
      <form onSubmit={handleSave}>
        <label>Introdu mesaj</label>
        <input
          type={'text'}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        ></input>
        <button type="submit"> Salveza</button>
      </form>
    </>
  )
}

export default Homepage
