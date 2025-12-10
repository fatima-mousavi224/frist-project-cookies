// import React from 'react'
import Cards from '../components/Cards'
import SecondCard from '../components/SecondCard'

export default function Layout() {
  return (
    <div className='w-full flex flex-col md:flex-row md:p-8 md:gap-4  lg:p-20 p-6 lg:justify-between md:justify-between justify-center'>
      <Cards/>
      <SecondCard />
    </div>
  )
}
