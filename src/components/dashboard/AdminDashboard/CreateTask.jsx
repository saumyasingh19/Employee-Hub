import React, { useContext, useState } from 'react';
import { useFirebase } from '../../../context/firebase';

const CreateTask = () => {
  const { SavedTask } = useFirebase();
  const [formdata, setformdata] = useState({
    Task: "",
    description: "",
    deadline: "",
    assign: "",
    catagory: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClick = async () => {
    try {
      await SavedTask(
        formdata.Task,
        formdata.description,
        formdata.deadline,
        formdata.assign,
        formdata.catagory
      );

      setformdata({
        Task: "",
        description: "",
        deadline: "",
        assign: "",
        catagory: ""
      });
      alert("Task Added Successfully");
    } catch (error) {
      alert("Error saving task:", error);
    }
  };

  return (
    <div className="bg-[#EAF9F1] rounded-2xl shadow-xl p-8 w-[100%] mx-auto mt-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">📝 Create New Task</h2>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
        {/* Fields */}
        {[
          { label: 'Task Title', name: 'Task', type: 'text', placeholder: 'Make a UI of Website' },
          { label: 'Assign To', name: 'assign', type: 'text', placeholder: 'Employee name' },
          { label: 'Category', name: 'catagory', type: 'text', placeholder: 'Design, Development, etc.' }
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formdata[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formdata.description}
            onChange={handleChange}
            placeholder="Enter detailed task description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            required
          ></textarea>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formdata.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;