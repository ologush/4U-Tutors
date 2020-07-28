import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import axios from "axios"

import * as qs from 'query-string'

function SaveStripe(props) {

    //const { code } = props.match.params;
    
    const { code } = qs.parse(props.location.search);
    console.log(code)
    const user = useSelector(state => state.auth.user);

    
    useEffect(() => {

        
        axios
        .post("/tutors/addStripe", { code: code, tutorID: user.id })
        .then(res => {
            window.location.href = "/accountSettings"
            
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            Loading...
        </div>
    )

}

export default SaveStripe;