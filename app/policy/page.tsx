"use client"
import React,{useState} from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Route/Footer'
import Policy from "./Policy"

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(3)
    const [route, setRoute] = useState("Login")
  return (
    <div >
          <Heading title="Policy Of-ELearning" description="Elarning platform is a platoform" keyword="programing,mern,react,nextjs"/>
          <Header
           open={open}
           setOpen={setOpen}
           activeItem={activeItem}
           setRoute ={setRoute}
           route={route}
           />
           <Policy/>
           <Footer/>
    </div>
    
  )
}

export default page