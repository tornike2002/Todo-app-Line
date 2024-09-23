import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../config/supabase";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../navbar/Navbar";

ChartJS.register(ArcElement, Tooltip, Legend);

const TodoChart = () => {
  const user = useUser();

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: !!user,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const importantCount = data?.filter((todo) => todo.important).length;
  const completedCount = data?.filter((todo) => todo.complate).length;
  const totalCount = data?.length;

  const chartData = {
    labels: ["Important", "Completed", "Total"],
    datasets: [
      {
        label: "Todos",
        data: [importantCount, completedCount, totalCount],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <section>
      <Navbar />
      <Doughnut data={chartData} />
    </section>
  );
};

export default TodoChart;
