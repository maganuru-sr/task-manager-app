import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: token
        }
      });

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  // CREATE TASK
  const createTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        {
          title,
          description
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };


  // COMPLETE TASK
  const completeTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${id}`,
        {
          status: "completed"
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: token
        }
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    }

    fetchTasks();

  }, []);


  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-5xl font-bold text-blue-600">
            Task Manager
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>


        {/* CREATE TASK */}

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Create Task
          </h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <button
            onClick={createTask}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Task
          </button>

        </div>


        {/* TASKS */}

        <div>

          <h2 className="text-3xl font-bold mb-6">
            My Tasks
          </h2>

          <div className="grid gap-6">

            {
              tasks.map((task) => (

                <div
                  key={task._id}
                  className="bg-white p-6 rounded-xl shadow-md"
                >

                  <h3 className="text-2xl font-bold mb-2">
                    {task.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {task.description}
                  </p>

                  <p className="mb-4">
                    Status:
                    <span
                      className={
                        task.status === "completed"
                          ? "text-green-600 font-bold ml-2"
                          : "text-yellow-600 font-bold ml-2"
                      }
                    >
                      {task.status}
                    </span>
                  </p>

                  <div className="flex gap-4">

                    <button
                      onClick={() => completeTask(task._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;