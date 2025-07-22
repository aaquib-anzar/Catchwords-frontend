import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../components/firebase.jsx";

export const AuthContext = createContext()

export const AuthProvider = ({children} ) => {
    const [user, setUser] = useState("")
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
          setUser(currentUser)
          console.log("User is logged in:", currentUser.email)
        }else{
          setUser(null);
          console.log("user is logged out")
        }
      })
  
      return () => unsubscribe()
    },[])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}