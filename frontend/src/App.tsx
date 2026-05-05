import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router'
function App() {

  return (
    <>
    <Header></Header>
    <Outlet/>
    <Footer></Footer>
    </>
  )
}

export default App
