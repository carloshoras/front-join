import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx'
import ItemDetailPage from './ItemDetailPage.jsx'

const App = () => {
  const [data, setData] = useState(null)
  const urlAPI = 'http://localhost:3000'

  const fetchData = async () => {
    try {
      const response = await fetch(urlAPI)
      const resData = await response.json()
      setData(resData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
  <Router>
    <div>
      <nav>
        <Link to="/">Inicio</Link> 
      </nav>
      {data === null ? (
        <div>cargando...</div>
      ) : (
        <Routes>
          <Route path="/" element={<Home data={data}/>}/>
          {data.map(item => (
            <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}></ItemDetailPage>}/>
          ))}
        </Routes>
      )}
    </div>
  </Router>      
  )
};

export default App;
