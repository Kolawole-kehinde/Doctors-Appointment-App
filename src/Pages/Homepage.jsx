import React from 'react'
import ShowCase from '../Components/ShowCase'
import SpecialityMenu from '../Components/SpecialityMenu'
import TopDoctors from '../Components/TopDoctors'
import Banner from '../Components/Banner'

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