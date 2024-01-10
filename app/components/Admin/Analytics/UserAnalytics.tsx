import Loader from "../../Leader/Loader";
import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { styles } from "@/app/styles/style";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsAPi";
import { Tooltip } from "@mui/material";

type Props = {
  isDashboard?: boolean;
};
const analyticsData = [
    {name:"January 2023", count:4030},
    {name:"February 2023", count:4030},
    {name:"March 2023", count:4030},
    {name:"April 2023", count:4030},
    {name:"Jun 2023", count:4030},
    {name:"July 2023", count:2030},
    {name:"August 2023", count:1000},
    {name:"Sep 2023", count:2000},
    {name:"Oct 2023", count:7800},
    {name:"December 2023", count:569}
   ]
const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

//   const analyticsData: any = [];
//   data &&
//     data.users.last12Months.forEach((item: any) => {
//       analyticsData.push({ name: item.month, count: item.count });
//     });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[20x] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm "
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : "text-center"}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px] "
              } px-5`}
            >
              Users Analytics
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
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
