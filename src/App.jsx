
import { Route, Routes } from 'react-router'
import './App.css'

import Root from './Layout/Root'
import Home from './Pages/Home/Home'
import Generate from './Pages/Generate'
import Creations from './Pages/Creations'
import SingleImage from './Pages/SingleImage'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Root></Root>}>
      <Route index element={<Home></Home>}></Route>
      <Route path='generate' element={<Generate></Generate>}></Route>
      <Route path='creations' element={<Creations></Creations>}></Route>
      <Route path='creation/:id' element={<SingleImage></SingleImage>}></Route>
      </Route>
    </Routes>
   
    </>
  )
}

export default App
