import { useEffect, useState } from "react";
import { useFirebase } from "../../../context/firebase";
import { auth, firestore } from "../../../context/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const AllTask = () => {
  const firebase = useFirebase();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const unsubTasks = onSnapshot(collection(firestore, "Tasks"), (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(data);
          setLoading(false);
        });

        return () => unsubTasks();
      } else {
        console.warn("No user is authenticated.");
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await firebase.deleteTask(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-[#EAF9F1] rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">📋 All Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-5 mb-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-800 flex items-center justify-between">
              {task.Task}
              {task.status === "completed" && (
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  ✅ Completed
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1"><strong>Assigned to:</strong> {task.assign}</p>
            <p className="text-sm text-gray-600"><strong>Category:</strong> {task.catagory}</p>
            <p className="text-sm text-gray-600"><strong>Deadline:</strong> {task.deadline}</p>
            <p className="text-sm text-gray-600"><strong>Description:</strong> {task.description}</p>
            <div className="text-right mt-4">
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllTask;