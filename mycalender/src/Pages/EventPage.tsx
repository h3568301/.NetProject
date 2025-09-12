import React from 'react'
import NavBar from '../Components/NavBar';
import EventPageComponent from '../Components/EventPageComponent';

type Props = {}

const EventPage = (props: Props) => {
    return (
        <>
            <NavBar/>
            <EventPageComponent/>
        </>
    )
}

export default EventPage