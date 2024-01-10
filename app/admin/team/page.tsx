"use client"
import React,{FC} from 'react'
import Heading from '../../utils/Heading'
import AdminSIdebar from "../../components/Admin/sidebar/AdminSIdebar"
import DashBoardHero from "../../components/Admin/DashBoardHero"
import AllCourses from "../../components/Admin/course/AllCourses"
import AdminProtected from '../../hooks/adminProtected'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
type Props = {}

const page:FC<Props> = (props) => {
  return (
    <div>
    <AdminProtected>
    <Heading title='ELearning Bd Admin' description='E learning Platform ' keyword='Programing,mern,redux,machin learning' />
        <div className="flex h-[100vh]">
            <div className="1500px:w-[15%] w-1/5">
                <AdminSIdebar/>
            </div>
             <div className="w-[85%]">
              <DashBoardHero/>
              <AllUsers isTeam={true} />
             </div>
        </div>
    </AdminProtected>
    </div>
  )
}

export default page