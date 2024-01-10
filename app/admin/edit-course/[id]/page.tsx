"use client"
import React from 'react'
import AdminSIdebar from "../../../components/Admin/sidebar/AdminSIdebar"
import Heading from '../../../../app/utils/Heading'
import CreateCourse from "../../../components/Admin/course/CreateCourse"
import DashBoardHeader from '../../../components/Admin/DashBoardHeader'
import EditCourse from '../../../components/Admin/course/EditCourse'
type Props = {}

const page = ({params}:any) => {
  const id = params?.id;
  
  return (
    <div>

    <Heading title='ELearning Bd Admin' description='E learning Platform ' keyword='Programing,mern,redux,machin learning' />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSIdebar/>
            </div>
             <div className="w-[85%]">
              <DashBoardHeader/>
              <EditCourse id={id}/>
             </div>
        </div>
    </div>
  )
}

export default page