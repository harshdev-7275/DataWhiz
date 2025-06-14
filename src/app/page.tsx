// app/page.tsx
'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { increment, decrement } from '../store/features/counterSlice'
import { logout, setUser } from '../store/features/userSlice'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BackgroundEffects from '@/components/BackgroundEffects'
import ChatbotContainer from '@/components/ChatbotContainer'


export default function HomePage() {

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()
  useEffect(()=>{
  if(user.token === null){
    dispatch(logout())
    router.push('/auth')
  }
  },[])

  return (
    <main className='relative w-screen h-screen overflow-hidden'>
      <BackgroundEffects/>
      <ChatbotContainer/>
      
    </main>
  )
}
