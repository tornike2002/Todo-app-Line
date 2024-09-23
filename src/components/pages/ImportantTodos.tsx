import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../config/supabase";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../navbar/Navbar";

const ImportantTodos = () => {
  const user = useUser();

  const fetchImportantTodos = async () => {
    if (!user.user?.id) {
      return [];
    }

    const { data, error } = await supabase
      .from("todos")
      .select("id, description, created_at, important")
      .eq("user_id", user.user?.id)
      .eq("important", true);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  // React Query to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["importantTodos"],
    queryFn: fetchImportantTodos,
    enabled: !!user.user?.id,
  });

  if (isLoading) return <div>Loading important todos...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <section className="flex flex-col gap-6 mt-7">
      <Navbar />
      <div className="bg-yellow-300 font-inter min-h-[242px] py-3 px-4 flex flex-col gap-4 shadow-custom-shadow mx-4">
        {data?.length ? (
          data.map((todo) => (
            <div key={todo.id}>
              <h2 className="h-[200px]">{todo.description}</h2>
              <p>{new Date(todo.created_at).toLocaleDateString("en-GB")}</p>
            </div>
          ))
        ) : (
          <div>No important todos found</div>
        )}
      </div>
    </section>
  );
};

export default ImportantTodos;
