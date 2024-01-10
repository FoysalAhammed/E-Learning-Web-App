import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from  "../Order/AllInvoices"
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsAPi";
type Props = {
  open?: boolean;
  value?: any;
};
const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        size={45}
        value={value}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboadrWidgets: FC<Props> = ({ open, value }) => {
  const [ordersCompareParcentage,setOrdersCompareParcentage] = useState<any>();
  const [usersCompareParcentage,setUsersCompareParcentage] = useState<any>();
  const {data,isLoading} = useGetUsersAnalyticsQuery({})
  const {data:ordersData,isLoading:ordersLoading} = useGetOrdersAnalyticsQuery({})

  useEffect(() => {
     if (isLoading && ordersLoading) {
      return
     }else{
      if (data && ordersData) {
         const usersLastTwoMonths = data?.users?.last12Months.slice(-2);
         const ordersLastTwoMonths = ordersData?.orders?.last12Months.slice(-2);
         
         if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths === 2) {
           const usersCurrentMonth = usersLastTwoMonths[1].count
           const usersPreviousMonth = usersLastTwoMonths[0].count
           const ordersCurrentMonth = ordersLastTwoMonths[1].count
           const ordersPreviousMonth = ordersLastTwoMonths[0].count

           const usersParcentChange = ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100;
           const ordersParcentChange = ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100;
           setUsersCompareParcentage({
            currentMonth:usersCurrentMonth,
            previousMonth:usersPreviousMonth,
            parcentageChange:usersParcentChange,
           });
           setOrdersCompareParcentage({
            currentMonth:ordersCurrentMonth,
            previousMonth:ordersPreviousMonth,
            parcentageChange:ordersParcentChange,
           })
       
         }
         
      }
     }
  }, [isLoading,ordersLoading,data,ordersData,setOrdersCompareParcentage,setUsersCompareParcentage])
  console.log(usersCompareParcentage?.parcentageChange);
  
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-7">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[50px] pr-8">
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-black text-[20px]" />
                <h5 className="pt-2 dark:text-[#fff] text-black text-[20px]">
                  120
                </h5>
                <h5 className="py-2 dark:text-[#45CBA0] text-black text-[20px]">
                  Sales Obtained
                </h5>
              </div>

            <div>
              <CircularProgressWithLabel value={100} open={open} />
              <h5 className="text-center pt-4">+120%</h5>
            </div>
          </div>
        </div>

        <div className="w-full dark:bg-[#111c43] rounded-sm shadow my-8">
          <div className="flex items-center p-5 justify-between">
            <div className="">
              <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px] " />
              <h5 className="pt-2 dark:text-[#fff] text-black text-[20px]">
               {usersCompareParcentage?.parcentageChange}
              </h5>
              +
              <h5 className="py-2 dark:text-[#45CBA0] text-black text-[20px]">
                New User
              </h5>
            </div>
            <div>
              <CircularProgressWithLabel value={100} open={open} />
              <h5 className="text-center pt-4">+120%</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div className="grid grid-cols-[65%,35%] mt-[-20px]">
        <div className="w-[94%] dark:bg-[#111c43] mt-[30px] h-[40vh] ml-8 rounded-sm shadow">
         <OrderAnalytics isDashboard={true}/>
        </div>
    <div className="p-5">
        <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] pb-0">Recent Transactions </h5>
        <AllInvoices isDashboard={true} />
    </div>
     </div>

    </div>
  );
};

export default DashboadrWidgets;
