import { useEffect, useState } from "react";
import "./App.scss";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import useCompletedTasks from "./hooks/useCompletedTasks";
import TaskFilter from "./TaskList/TaskFilter";
import useALLTasks from "./hooks/useAllTasks";
import usePTasks from "./hooks/percentTask";
import useNotCompletedTasks from "./hooks/useNotCompletedTasks";

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/tasks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const fetchedTasks = data.tasks;
      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else {
        throw new Error("Fetched tasks data is not an array");
      }
    } catch (error) {
      console.error("failed to fetch tastk:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (taskName: string) => {
    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskComponent = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCounter = useCompletedTasks(tasks);
  const allTasksCounter = useALLTasks(tasks);
  const notCompletedTasksCounter = useNotCompletedTasks(tasks);
  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };
  const filteredTasks = tasks.filter((tasks) => {
    if (filter === "completed") return tasks.completed;
    if (filter === "incomplete") return !tasks.completed;
    return true;
  });

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <>
      <div className="App">
        <h1>To-Do List</h1>
        <TaskFilter
          onFilterChange={handleFilterChange}
          currentFilter={filter}
        />
        <TaskForm onAddTask={addTask} />
        <TaskList
          key={tasks.length}
          tasks={filteredTasks}
          onToggleTaskComponent={toggleTaskComponent}
          onDeleteTask={deleteTask}
        />
        <p>Completed Tasks: {completedTasksCounter}</p>
        <p>Another Tasks: {notCompletedTasksCounter}</p>
        <p>All Tasks: {allTasksCounter}</p>
        <p>Of all: {usePTasks(tasks)} %</p>
      </div>
    </>
  );
};

export default App;
