import React from 'react'
import ShowCase from '../Componets/ShowCase'
import SpecialityMenu from '../Componets/SpecialityMenu'
import TopDoctors from '../Componets/TopDoctors'

const HomePage = () => {
  return (
    <div>
      <ShowCase/>
      <SpecialityMenu/>
      <TopDoctors/>
    </div>
  )
}

export default HomePage