import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const navigate = useNavigate();
    const [credit, setCredit] = useState(false);

    const backendUrl = (import.meta.env.VITE_BACKEND_URL ?? '')
        .trim()
        .replace(/^['"]|['"]$/g, '')
        .replace(/\/+$/, '')

    const apiUrl = (path) => {
        if (!backendUrl) return path
        try {
            return new URL(path, backendUrl).toString()
        } catch {
            return backendUrl + path
        }
    }

    useEffect(() => {
        if (import.meta.env.PROD && !backendUrl) {
            toast.error('Backend URL is not set. Configure VITE_BACKEND_URL in Netlify and redeploy.')
        }
    }, [backendUrl])

    const loadCreditsData = async()=>{
        try {
            const {data} = await axios.get(apiUrl('/api/user/credits'), {headers: {token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)

            }
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message)    
        }
    }

    const generateImage = async(prompt)=>{
        try {
            const {data} = await axios.post(apiUrl('/api/image/generate-image'), {prompt}, {headers: {token}})

            if(data.success){
                loadCreditsData()
                return data.resultImage
            }
            else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }
        } 
        catch (error) {
            toast.error(error.message) 
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    }, [token])

    const value ={
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider> //Share data with everything inside.
    )
}

export default AppContextProvider;