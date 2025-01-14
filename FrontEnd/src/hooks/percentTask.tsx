import { useEffect, useState } from "react";

const usePTasks = (tasks: { completed: boolean }[]) => {
  const [percentTasksCounter, setPercentTasksCounter] = useState(0);

  useEffect(() => {
    const countA = tasks.length;
    const countC = tasks.filter((task) => task.completed).length;
    setPercentTasksCounter((countC * 100) / countA);
  }, [tasks]);
  return percentTasksCounter;
};

export default usePTasks;
