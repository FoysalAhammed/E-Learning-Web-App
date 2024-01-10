"use client"
import React,{FC} from 'react'
import Heading from '../../utils/Heading'
import AdminSIdebar from "../../components/Admin/sidebar/AdminSIdebar"
import DashBoardHero from "../../components/Admin/DashBoardHero"
import AdminProtected from '../../hooks/adminProtected'
import EditCategories from "../../components/Admin/Customization/EditCategories"
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
              <EditCategories/>
             </div>
        </div>
    </AdminProtected>
    </div>
  )
}

export default page