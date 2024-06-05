import React from "react";
import PieChart from "./components/chart/PieChart";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "./components/widget/Widget"
import LineChart from "./components/chart/LineChart";
const Dashboard = () => {
  return (
    <div className=" lg:px-36 px-0">
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
    <Widget
      icon={<MdBarChart className="h-7 w-7" />}
      title={"Earnings"}
      subtitle={"$340.5"}
    />
    <Widget
      icon={<IoDocuments className="h-6 w-6" />}
      title={"Spend this month"}
      subtitle={"$642.39"}
    />
    <Widget
      icon={<MdBarChart className="h-7 w-7" />}
      title={"Sales"}
      subtitle={"$574.34"}
    />
    <Widget
      icon={<MdDashboard className="h-6 w-6" />}
      title={"Your Balance"}
      subtitle={"$1,000"}
    />
    <Widget
      icon={<MdBarChart className="h-7 w-7" />}
      title={"New Tasks"}
      subtitle={"145"}
    />
    <Widget
      icon={<IoMdHome className="h-6 w-6" />}
      title={"Total Projects"}
      subtitle={"$2433"}
    />
  </div>
  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative flex flex-col rounded-[20px]
        bg-white bg-clip-border shadow-3xl shadow-shadow-500 p-3">
        <PieChart />
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
