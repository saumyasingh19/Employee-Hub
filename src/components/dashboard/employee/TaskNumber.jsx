import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../context/firebase";

const TaskNumber = () => {
  const [taskStats, setTaskStats] = useState({
    total: 0,
    new: 0,
    completed: 0,
    remaining: 0
  });

  useEffect(() => {
    const fetchTaskCounts = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "Tasks"));
        const tasks = snapshot.docs.map(doc => doc.data());

        const total = tasks.length;
        const newTasks = tasks.filter(task => task.status === "new").length;
        const completed = tasks.filter(task => task.status === "completed").length;
        const remaining = total - completed;

        setTaskStats({ total, new: newTasks, completed, remaining });
      } catch (error) {
        console.error("Error fetching task stats: ", error);
      }
    };

    fetchTaskCounts();
    const interval = setInterval(fetchTaskCounts, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {/* Total Tasks Card */}
      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow'>
        <h2 className='text-4xl font-bold text-green-800 mb-2'>{taskStats.total}</h2>
        <h3 className='text-lg font-medium text-green-600'>Total Tasks</h3>
        <p className='text-sm text-green-400 mt-2'>All assigned tasks</p>
      </div>
      
      {/* New Tasks Card */}
      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow'>
        <h2 className='text-4xl font-bold text-green-800 mb-2'>{taskStats.new}</h2>
        <h3 className='text-lg font-medium text-green-600'>New Tasks</h3>
        <p className='text-sm text-green-400 mt-2'>Recently assigned</p>
      </div>
      
      {/* Completed Tasks Card */}
      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 hover:shadow-lg transition-shadow'>
        <h2 className='text-4xl font-bold text-emerald-800 mb-2'>{taskStats.completed}</h2>
        <h3 className='text-lg font-medium text-emerald-600'>Completed Tasks</h3>
        <p className='text-sm text-emerald-400 mt-2'>Finished successfully</p>
      </div>
      
      {/* Remaining Tasks Card */}
      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow'>
        <h2 className='text-4xl font-bold text-amber-800 mb-2'>{taskStats.remaining}</h2>
        <h3 className='text-lg font-medium text-amber-600'>Remaining Tasks</h3>
        <p className='text-sm text-amber-400 mt-2'>Pending completion</p>
      </div>
    </div>
  );
};

export default TaskNumber;