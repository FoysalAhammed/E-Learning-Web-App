import React, { useState } from 'react'
import DashBoardHeader from "./DashBoardHeader"
import DashboadrWidgets from "../../components/Admin/Widgets/DashboadrWidgets"
type Props = {
  isDashboard?:boolean;
}

const DashBoardHero = ({isDashboard}:Props) => {
  const [open,setOpen] = useState(false)

  return (
    <div>
        <DashBoardHeader open={open} setOpen={setOpen} />
      {
        isDashboard && (
          <DashboadrWidgets open={open} />
        )
      }
    </div> 
  )
}

export default DashBoardHero