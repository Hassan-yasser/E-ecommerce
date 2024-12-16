import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { user } from '../../Context/UserContext';

export default function GaurdRoots({children}) {
     let {token} = useContext(user)
     if (token !== null) {
        return children
     }
     else {
        return <Navigate to={'/auth/login'}/>
     }

}
