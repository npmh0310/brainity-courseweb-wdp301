import React, { useEffect, useState } from "react";
import PieChart from "./components/chart/PieChart";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard, MdOutlineSupervisedUserCircle, MdBookmarks  } from "react-icons/md";
import Widget from "./components/widget/Widget"
import LineChart from "./components/chart/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { getTotalDashboard } from "../../../fetchData/User";
import { formatCurrencyVND } from "../../../function/function";
const Dashboard = () => {

  const [data, setData] = useState()

  useEffect(()=> {
    getTotalDashboard()
    .then((res) => {
      // console.log(res.data);
      setData(res.data.data);
    })
    .catch((err)=>{console.log(err);})
  }, [])

  return (
    <div className=" lg:px-36 px-6">
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
    <Widget
      icon={<MdOutlineSupervisedUserCircle className="h-7 w-7" />}
      title={"Total User"}
      subtitle={data?.totalUser}
    />
    <Widget
      icon={<MdDashboard className="h-6 w-6" />}
      title={"Total Course"}
      subtitle={data?.totalCourse}
    />
    <Widget
      icon={<MdBookmarks className="h-6 w-6" />}
      title={"Total Blog"}
      subtitle={data?.totalBlog}
    />
    <Widget
      icon={ <FontAwesomeIcon icon={faChalkboardUser} className="h-7 w-7" />}
      title={"Total Teacher"}
      subtitle={data?.totalTeacher}
    />
    <Widget
      icon={<MdBarChart className="h-7 w-7" />}
      title={"Revenue"}
      subtitle={formatCurrencyVND(data?.revenue) + " VNĐ"}
    />
  </div>
  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative flex flex-col rounded-[20px]
        bg-white bg-clip-border shadow-3xl shadow-shadow-500 p-3">
        <PieChart dataTotal={data}/>
      </div>
      <div className="relative flex flex-col rounded-[20px]
        bg-white bg-clip-border shadow-3xl shadow-shadow-500 p-3">
        <LineChart />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
