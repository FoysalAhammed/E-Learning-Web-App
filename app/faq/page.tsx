"use client"
import React,{useState} from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Route/Footer'

import FAQ from '../components/Route/FAQ'

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(3)
    const [route, setRoute] = useState("Login")
  return (
    <div className='min-h-screen' >
          <Heading title="Faq of -ELearning" description="Elarning platform is a platoform" keyword="programing,mern,react,nextjs"/>
          <Header
           open={open}
           setOpen={setOpen}
           activeItem={activeItem}
           setRoute ={setRoute}
           route={route}
           />
           <FAQ/>
           <Footer/>
    </div>
    
  )
}

export default page