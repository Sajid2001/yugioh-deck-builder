import { useState } from 'react'
import { useSignup } from '../Hooks/UseSignup';

export default function SignupForm() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email,username,password)
    }

  return (
    <div class="w-full max-w-sm">
        <h1 className='text-5xl m-6 text-center'>
            Sign Up
        </h1>
        <form onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email"/>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
            </label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
        <div class="mb-5">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
            </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
        </div>
        <div class="flex items-center justify-between">
            <button disabled={isLoading} class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign Up
            </button>
        </div>
        {error && 
          <div className='my-1 p-2 text-red-400 font-light text-md'>
              {error}
          </div>}
        </form>
      </div>
  )
}
