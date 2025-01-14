import { useEffect, useState } from "react";

const useNotCompletedTasks = (tasks: { completed: boolean }[]) => {
  const [notCompletedTasksCounter, setNotCompletedTasksCounter] = useState(0);

  useEffect(() => {
    const count = tasks.filter((task) => !task.completed).length;
    setNotCompletedTasksCounter(count);
  }, [tasks]);

  return notCompletedTasksCounter;
};

export default useNotCompletedTasks;
