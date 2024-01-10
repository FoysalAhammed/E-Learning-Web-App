"use client"
import React from 'react'
import AdminSIdebar from "../../components/Admin/sidebar/AdminSIdebar"
import Heading from '../../../app/utils/Heading'
import DashBoardHeader from '../../components/Admin/DashBoardHeader'
import AllInvoices from '../../../app/components/Admin/Order/AllInvoices'
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
              <AllInvoices/>
             </div>
        </div>
    </div>
  )
}

export default page