"use client"
import React,{FC} from 'react'
import Heading from '../../utils/Heading'
import AdminSIdebar from "../../components/Admin/sidebar/AdminSIdebar"
import DashBoardHero from "../../components/Admin/DashBoardHero"
import AdminProtected from '../../hooks/adminProtected'
import EditHero from "../../components/Admin/Customization/EditHero"
type Props = {}

const page:FC<Props> = (props) => {
  return (
    <div>
    <AdminProtected>
    <Heading title='ELearning Bd Admin' description='E learning Platform ' keyword='Programing,mern,redux,machin learning' />
        <div className="flex h-screen">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSIdebar/>
            </div>
             <div className="w-[85%]">
              <DashBoardHero/>
              <EditHero/>
             </div>
        </div>
    </AdminProtected>
    </div>
  )
}

export default page