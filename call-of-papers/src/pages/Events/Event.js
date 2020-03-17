import React from 'react';
import { useParams } from 'react-router';

const Event = () => {
    let { eventId } = useParams();
    
    return (
        <h2>Event Page ID: {eventId}</h2>
    );
};

export default Event;
