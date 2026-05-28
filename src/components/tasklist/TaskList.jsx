import { useState, useEffect } from "react";
import { useFirebase } from "../../context/firebase";
import { auth } from "../../context/firebase";

const TaskList = () => {
  const firebase = useFirebase();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (user) => {
    try {
      const data = await firebase.getTasks(user.email);
      const filteredTasks = data.filter(task => task.status !== "completed");
      setTasks(filteredTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) await fetchTasks(user);
      else setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      await firebase.markTaskCompleted(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error marking task as completed:", error);
      const user = auth.currentUser;
      if (user) await fetchTasks(user);
    }
  };

  if (loading) return (
    <div className="flex justify-center mt-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Your Active Tasks</h2>
        <span className="text-sm bg-blue-100 text-green-800 px-3 py-1 rounded-full">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-medium text-green-800 mb-2">No tasks assigned</h3>
          <p className="text-green-600">You're all caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-sm p-5 border border-green-100 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-green-600 bg-blue-50 px-2 py-1 rounded">
                  Due: {task.deadline}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  task.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800'
                }`}>
                  {task.status || 'pending'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-green-900 mb-2">{task.Task}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {task.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-blue-100 text-green-800 px-2 py-1 rounded">
                  Assigned to: {task.assign}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {task.catagory}
                </span>
              </div>

              <button
                onClick={() => handleComplete(task.id)}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                Mark Complete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;