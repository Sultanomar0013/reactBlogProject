import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import AuthService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userData = await AuthService.getCurrentUser();
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentUser();
    }, [dispatch]);
  
  return !loading ? (
    <>
      <div className='min-h-screen flex flex-wrap content-between
        bg-gray-400'>
        <div className='w-full block'>
            <Header />
            <main>
              { /* <Outlet /> */}
            </main>
            <Footer />
        </div>
        </div>
    </>
  ) : null
}

export default App
