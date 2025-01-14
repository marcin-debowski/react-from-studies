import { useEffect, useState } from "react";

const useALLTasks = (tasks: { completed: boolean }[]) => {
  const [allTasksCounter, setALLTasksCounter] = useState(0);

  useEffect(() => {
    const count = tasks.length;
    setALLTasksCounter(count);
  }, [tasks]);

  return allTasksCounter;
};

export default useALLTasks;
