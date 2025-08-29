
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth, signIn,signOut } from '@/auth'


const Navbar = async() => {
  const session = await auth();
  return (
    <header className='px-5 py-5 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
           <div className='flex justify-start items-center'>
            <Link href="./">
            <Image src="/icon.png" alt="logo" width={30} height={30}/>
            </Link>
           
          <Link href="./"><span className= "font-bigshot-one text-2xl text-red-400">PitchBox</span></Link>

            </div>

            <div className='flex items-center gap-5 font-medium text-black'> 
                {session && session?.user ? (
                  <>
                  <Link href="/startup/create">
                  <span>Create</span>
                  </Link>
            
                  <form action={async()=>{
                  "use server"
                  await signOut()
                 }}>
                  <button className='cursor-pointer' type="submit">Logout</button>
                 </form>

                  <Link href={"`/user/${session?.id}`"}>
                   <span>{session?.user?.name}</span>
                  </Link>
                  </>
                ): (
                 <form action={async()=>{
                  "use server"
                  await signIn("github")
                 }}>
                  <button className='cursor-pointer'  type="submit">Login</button>
                 </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar