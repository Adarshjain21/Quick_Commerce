import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";


const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2 lg:hidden'>
      <button className='block w-fit ml-auto' onClick={() => window.history.back()}>
         <IoClose size={25}/>
      </button> 
      <div className='container mx-auto p-5'>
      <UserMenu />
      </div>
    </section>
  )
}

export default UserMenuMobile
