import { redirect } from "next/navigation";
import { ReactNode} from 'react'
import userAuth from "./userAuth";

type ProtectedProps = {
    children:ReactNode
}

export default function Protected ({children}:ProtectedProps){
  const isAuthenticated = userAuth()
  return isAuthenticated ? children : redirect("/")
}
