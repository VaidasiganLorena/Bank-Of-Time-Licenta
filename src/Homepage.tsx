import { doc, getDoc, collection, addDoc} from '@firebase/firestore';
import React, {  useState } from 'react'
import { firestore, loginData} from '../src/firebase'
import './App.css'

const Homepage=()=> {
  const [message, setMessage]= useState('');
  const dataFromFirestoreRef= doc(firestore,'users')
  const dataFromDatabase= getDoc( dataFromFirestoreRef)
  const usersRef = collection(firestore, "users");
  const handleSave = async(e: any) =>{
    e.preventDefault()
  loginData("Maria", "Paun", "0745562855")
  }

  return( 
  
  <><div>Homepage</div><form onSubmit={handleSave}>
      <label>
        Introdu mesaj
      </label>
      <input type={'text'} value={message} onChange={(e) => setMessage(e.currentTarget.value)}>
      </input>
      <button type='submit'> Salveza</button>
    </form></>
  )
}

export default Homepage



