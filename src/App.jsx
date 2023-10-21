import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const[password,setPassword] =  useState('')
  const[length,setLength] = useState(8)
  const[numberAllowed,setNumberAllowed] = useState(false)
  const[charAllowed,setCharAllowed] = useState(false)

  useEffect(() => {
   generatePassword() 
  }, [length,charAllowed,numberAllowed])

  const passRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"

    for(let i=1; i <=length; i++){
      pass += str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllowed])

  const copyPassToClip = () => {
    window.navigator.clipboard.writeText(password)
    passRef.current.select()
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passRef}/>
        <button onClick={copyPassToClip} className="outline-none bg-blue-700 text-white px-3 py-0 5 shrink-0">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={20} value={length} onChange={(e) => setLength(e.target.value)} className='cursor-pointer' />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}} name="" id="" />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}} name="" id="" />
          <label htmlFor="character">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
