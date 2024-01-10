import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsAPi";
import Loader from "../../Leader/Loader";
import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};
const analyticsData = [
  { name: "Page A", count: 1099 },
  { name: "Page B", count: 2057 },
  { name: "Page C", count: 2597 },
  { name: "Page D", count: 5978 },
  { name: "Page E", count: 8500 },
  { name: "Page F", count: 7800 },
  { name: "Page G", count: 6000 },
];

const OrderAnalytics = ({ isDashboard }: Props) => {
  const {data, isLoading, isError } = useGetOrdersAnalyticsQuery({});



  // const analyticsData:any = []
  // data && data.orders.last12Months.forEach((item:any) =>{
  //   analyticsData.push({name:item.month,count:item.count})
  // })

 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? "h-[30vh] " : "h-screen"}`}>
          <div
            className={`${
              isDashboard ? "mt-[0px] pl-[40px] mb-2" : " mt-[50px] text-center"
            }`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px] "
              } px-5 `}
            >
              Order Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                {" "}
                Last 12 Months Analytics
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <LineChart 
               width={500}
               height={300}
               data={analyticsData}
               margin={{
                top:5,
                right:30,
                left:20,
                bottom:5,
             }}
              >
                <CartesianGrid />
                <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {!isDashboard && <Legend/> }
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fill="#4d62d9"
              />
              </LineChart>
             
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
