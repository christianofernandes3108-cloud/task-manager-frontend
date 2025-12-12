import { useState, useEffect } from "react";
import { FaTrash, FaCheckCircle, FaPlusCircle, FaSearch, FaSort } from "react-icons/fa";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 🔁 new

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      category,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) =>
      t.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // 🧮 Sorting logic
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "priority") {
      const order = { High: 3, Medium: 2, Low: 1 };
      return order[b.priority] - order[a.priority];
    }
    if (sortOrder === "completed") return a.completed - b.completed;
    return 0;
  });

  return (
    <div className="page">
      <h2>📝 My Tasks</h2>

      {/* Add Task Section */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Work</option>
          <option>Study</option>
          <option>Personal</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={addTask}>
          <FaPlusCircle /> Add
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters + Sort */}
      <div className="filters">
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="sort-dropdown">
          <FaSort />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
            <option value="completed">Incomplete → Complete</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        <ul className="task-list">
          {sortedTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(task.id)}>
                {task.completed ? <FaCheckCircle color="limegreen" /> : "⭕"}{" "}
                {task.text}
              </span>

              <div className="task-meta">
                <span className={`category ${task.category.toLowerCase()}`}>
                  {task.category}
                </span>
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>

              <button className="delete" onClick={() => deleteTask(task.id)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
