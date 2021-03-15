import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const URL = 'http://localhost/api/bears'

export default function Home() {
  const [bears, setBears] = useState({
    list: [
      { id: 1, name: 'Winnie', weight: 22 },
    ]
  }
  )

  const [name ,setName] = useState('')
  const [weight ,setWeight] = useState(0)
  const [bear ,setBear] = useState({})

  useEffect( () => { getBears()},[])

  const getBears = async () => {
    let bears = await axios.get(URL)
    setBears(bears.data)
    console.log('Bear:',bears.data)
  }
 
 
  const printBears = () => {
    if (bears.list && bears.list.length)
    return bears.list.map(
      (item, index) =>
        <li key={index}>
          {item.id}:
          {item.name}:
          {item.weight}
          <button onClick={()=> getBear(item.id)}>Get</button>
          <button onClick ={()=> updateBear(item.id)}>UPDATE</button>
          <button onClick ={()=> deleteBear(item.id)}>DELETE</button>
        </li>
    )
    else
      return (<li>NO Bears</li>)
  }

 const getBear = async (id)=>{
    let bear = await axios.get(`${URL}/${id}`)
    setBear( {name: bear.data.name , weight: bear.data.weight})
  }

  const addBears = async(name , weight) => {
    let bears = await axios.post(URL,{name,weight})
    setBears(bears.data)
  }
  const updateBear = async(id) => {
    let bears = await axios.put(`${URL}/${id}`, {name,weight} )
    setBears(bears.data)
  }
  const deleteBear = async(id) =>{
    let bears = await axios.delete(`${URL}/${id}`)
    setBears(bears.data)
  }
  return (
    <div>Bears
      <ul>
        {printBears()}
        Selected bear: {bear.name} : {bear.weight}

        <h2>Add Bear</h2>
        Name : <input type="text" onChange ={ (e) => setName(e.target.value)} /><br/>
        Weight : <input type="number" onChange ={ (e) => setWeight(e.target.value)} /><br/>
        <button onClick ={()=> addBears(name,weight)}>ADD</button> 
        
      </ul>
    </div>
  )
}
