import './App.css'
import { FiPlus, FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'
const API = "http://localhost:5000/"

function App() {

  const [newPlayer, setNewPlayer] = useState('')
  const [listPlayers, setListPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [shot, setShot] = useState(0)

  useEffect(() => {

    const loadData = async () => {

      setLoading(true)

      const res = await fetch(API + "players")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

      setLoading(false)

      setListPlayers(res)
    }

    loadData()
  }, [])

  const handleAddPlayer = async (e) => {

    e.preventDefault()

    const playerInfo = {
      id: Math.random(),
      newPlayer,
      shot,
    }

    await fetch(API + "players", {
      method: "POST",
      body: JSON.stringify(playerInfo),
      headers: {
        "Content-Type": "application/json"
      },
    })

    setListPlayers((prevState) => [...prevState, playerInfo])

    setNewPlayer("")

  }

  const handleDelete = async (id) => {
    await fetch(API + "players/" + id, {
      method: "DELETE"
    })

    setListPlayers((prevState) => prevState.filter((playerInfo) => playerInfo.id !== id))
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className='title'>Bebo que Bebe</h1>
      </div>

      <div className="main">

        <h2>Adicione um jogador!</h2>
        <div className='input-space'>
          <input
            className='input-add'
            type="text"
            placeholder='Adicione o nome do jogador...'
            onChange={(e) => setNewPlayer(e.target.value)}
            value={newPlayer || ""}
            required
          />
          <FiPlus onClick={handleAddPlayer} />
        </div>

      </div>

      <div className="players">


        {listPlayers.map((playerInfo) => (
          <div key={playerInfo.id} className='card-player'>
            <h3 className='name'>{playerInfo.newPlayer}</h3>
            <button className='shots'>Já bebeu: {shot}</button>
            <FiX className='close' onClick={() => handleDelete(playerInfo.id)} />
          </div>
        ))}


      </div>
    </div >
  )
}

export default App
