import { collection, addDoc } from '@firebase/firestore'
import React from 'react'
import { firestore } from '../src/firebase'
import './App.css'

const Homepage = () => {
  const usersRef = collection(firestore, 'users')

  const handleSave = async (e: any) => {
    e.preventDefault()
    try {
      let dataUser = {

        firstName: 'Mario',
        lastName: 'Darian',
        numberPhone: '0764454567',
      }
      addDoc(usersRef, dataUser)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div>Homepage</div>
      <form onSubmit={handleSave}>
        <label>Introdu mesaj</label>
        <input type={'text'}></input>
        <button type="submit"> Salveza</button>
      </form>
    </>
  )
}

export default Homepage
