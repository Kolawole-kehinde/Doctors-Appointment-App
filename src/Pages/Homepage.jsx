import React from 'react'
import ShowCase from '../Componets/ShowCase'
import SpecialityMenu from '../Componets/SpecialityMenu'
import TopDoctors from '../Componets/TopDoctors'
import Banner from '../Componets/Banner'

const HomePage = () => {
  return (
    <div>
      <ShowCase/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default HomePage