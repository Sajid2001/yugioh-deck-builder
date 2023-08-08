import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Features/User';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const signup = async(email,username, password) => {
        setIsLoading(true)
        setError(null)

            const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({ 
                    "email":email, 
                    "username": username, 
                    "password": password })
            })
            const json = await response.json();
            if(!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if(response.ok) {
                localStorage.setItem('user', JSON.stringify(json))
                {dispatch(setUser(json))}
                setIsLoading(false);
            }
    }
    return { signup, isLoading, error }
}
