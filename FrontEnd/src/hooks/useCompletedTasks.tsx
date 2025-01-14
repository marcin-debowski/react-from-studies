import { useEffect, useState } from "react";

const useCompletedTasks = (tasks: { completed: boolean }[]) => {
  const [completedTasksCounter, setCompletedTasksCounter] = useState(0);

  useEffect(() => {
    const count = tasks.filter((task) => task.completed).length;
    setCompletedTasksCounter(count);
  }, [tasks]);

  return completedTasksCounter;
};

export default useCompletedTasks;
