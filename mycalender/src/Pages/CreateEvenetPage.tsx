import React from 'react'
import NavBar from '../Components/NavBar'
import CreateEventComponent from '../Components/CreateEventComponent'

type Props = {}

const CreateEvenetPage = (props: Props) => {
  return (
    <div>
        <NavBar/>
        <CreateEventComponent/>
    </div>
  )
}

export default CreateEvenetPage