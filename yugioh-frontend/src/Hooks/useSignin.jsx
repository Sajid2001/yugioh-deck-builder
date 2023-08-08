import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Features/User';

export const useSignin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch();

    const signin = async(email, password) => {
        setIsLoading(true)
        setError(null)

            const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    "email":email,
                    "password":password
                })
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
        return { signin, isLoading, error }

    }