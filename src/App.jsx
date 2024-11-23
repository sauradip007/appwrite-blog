import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// whenevber we ask db or store for data we implement loading state
function App() {
console.log(import.meta.env.VITE_APPWRITE_URL) // "123"
// console.log(import.meta.env.DB_PASSWORD) // undefined
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{

    authService.getCurrentUser()
    .then((userData) => {

      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((err) => {
                console.error('Error fetching user:', err);
                dispatch(logout());
            })
    .finally(()=> setLoading(false))

  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
