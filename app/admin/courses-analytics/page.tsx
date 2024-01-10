"use client"
import React from 'react'
import AdminSIdebar from "../../components/Admin/sidebar/AdminSIdebar"
import Heading from '../../../app/utils/Heading'
import CourseAnalytics from '../../components/Admin/Analytics/CourseAnalytics'
import DashBoardHeader from '../../components/Admin/DashBoardHeader'
type Props = {}

const page = (props: Props) => {
  return (
    <div>

    <Heading title='ELearning Bd Admin' description='E learning Platform ' keyword='Programing,mern,redux,machin learning' />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSIdebar/>
            </div>
             <div className="w-[85%]">
              <DashBoardHeader/>
              <CourseAnalytics/>
             </div>
        </div>
    </div>
  )
}

export default page