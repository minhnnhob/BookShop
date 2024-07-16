import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import store, { RootState } from "../../Redux/store";
import { getStatistic } from "../../Redux/dashboardSlice";
import LoadingLayer from "../../Components/LoadingLayer";
import monthConverter from "../../Components/Converter/month";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface RevenueData {
  month: number;
  quantity: number;
  revenue: number;
}

interface OrderData {
  status: string;
  quantity: number;
}

export default function Dashboard() {
  const loading = useSelector((state: RootState) => state.dashboard.loading);
  const { revenue, orders } = useSelector(
    (state: RootState) => state.dashboard.statistic
  );

  useEffect(() => {
    store.dispatch(getStatistic());
  }, []);

  const barChartLabels = revenue.map((item: RevenueData) =>
    monthConverter(item.month)
  );
  const barChartData = [
    {
      label: "Total (orders)",
      data: revenue.map((item: RevenueData) => item.quantity),
      backgroundColor: "#FFD333",
    },
    {
      label: "Revenue ($)",
      data: revenue.map((item: RevenueData) => item.revenue),
      backgroundColor: "#3D464D",
    },
  ];
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Last 3 months performance",
      },
    },
  };

  const pieChartLabels = orders.map((item: OrderData) => item.status);
  const pieChartData = [
    {
      label: "# of orders",
      data: orders.map((item: OrderData) => item.quantity),
      backgroundColor: ["#E0E0E0", "#FFD333", "#3D464D", "#4A5F63", "#433C4D"],
      borderWidth: 1,
    },
  ];
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Orders",
      },
    },
  };

  return (
    <>
      {loading && <LoadingLayer />}
      <div className="container-fluid bg-light p-4">
        <div className="row">
          <div className="col-8">
            <Bar
              options={barChartOptions}
              data={{
                labels: barChartLabels,
                datasets: barChartData,
              }}
            />
          </div>
          <div className="col-4">
            <Pie
              options={pieChartOptions}
              data={{
                labels: pieChartLabels,
                datasets: pieChartData,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
