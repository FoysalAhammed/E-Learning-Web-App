"use client"
import React,{useState} from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Route/Footer'
import About from "./About"

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(2)
    const [route, setRoute] = useState("Login")
  return (
    <div >
          <Heading title="About Us-ELearning" description="Elarning platform is a platoform" keyword="programing,mern,react,nextjs"/>
          <Header
           open={open}
           setOpen={setOpen}
           activeItem={activeItem}
           setRoute ={setRoute}
           route={route}
           />
           <About/>
           <Footer/>
    </div>
    
  )
}

export default page