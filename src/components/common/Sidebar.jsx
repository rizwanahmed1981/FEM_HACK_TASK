import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useTasks } from "../../hooks/usetasks";
import { IoHomeOutline, IoRocketOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPlus, FaRegClock } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";
import { IoIosPause } from "react-icons/io";

function Sidebar({ user }) {
  const { tasks } = useTasks(user);
  const [isExpanded, setIsExpanded] = useState(false);

  const taskCounts = {
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    deployed: tasks.filter((t) => t.status === "deployed").length,
    deferred: tasks.filter((t) => t.status === "deferred").length,
  };

  const handleSignOut = async () => {
    await auth.signOut();
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLinkClick = () => {
    // Collapse sidebar on mobile when a link is clicked
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={`bg-[#52538B] text-white p-4 flex flex-col justify-between transition-all duration-300 
      ${
        isExpanded ? "w-full md:w-72" : "w-24"
      } h-full rounded-br-2xl relative z-50`}
    >
      <div className="mt-11 space-y-6">
        {/* Header with Logo and Title */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-2xl">
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
              <p>GP</p>
            </div>
            {isExpanded && <h2 className="font-bold">GlidePlan</h2>}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-2xl md:block hidden absolute bg-[#52538B] p-2 rounded-full top-18 -right-3 shadow"
          >
            {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
          <button
            onClick={toggleSidebar}
            className="text-2xl md:hidden absolute bg-[#52538B] p-2 rounded-full top-18 -right-3 shadow"
          >
            {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="text-xl">
          <Link
            to="/"
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
            <IoHomeOutline />
            </div>
            {isExpanded && <div>Dashboard</div>}
          </Link>
          <Link
            to="/completed"
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
              <FaCheck />
            </div>
            {isExpanded && <div>Completed Tasks ({taskCounts.completed})</div>}
          </Link>
          <Link
            to="/pending"
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
              <FaRegClock />
            </div>
            {isExpanded && <div>Pending Tasks ({taskCounts.pending})</div>}
          </Link>
          <Link
            to="/in-progress"
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
              <RiLoader2Fill />
            </div>
            {isExpanded && (
              <div>In Progress Tasks ({taskCounts.inProgress})</div>
            )}
          </Link>
          <Link
            to="/deployed"
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
              <IoRocketOutline />
            </div>
            {isExpanded && <div>Deployed Tasks ({taskCounts.deployed})</div>}
          </Link>
          <Link
            to="/deferred"
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
              <IoIosPause />
            </div>
            {isExpanded && <div>Deferred Tasks ({taskCounts.deferred})</div>}
          </Link>
          <Link
            to="/add-task"
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            <div className="border border-white rounded hover:bg-[#ffffff71] w-10 h-10 flex items-center justify-center">
              <FaPlus />
            </div>
            {isExpanded && <div>Add New Task</div>}
          </Link>
        </nav>
      </div>

      {/* Sign In/Out */}
      <div className="text-xl">
        {user ? (
          <div
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={() => {
              handleSignOut();
              handleLinkClick();
            }}
          >
            {isExpanded && <span>Sign Out</span>}
          </div>
        ) : (
          <div
            className="py-2 flex items-center gap-2 hover:bg-[#ffffff71] rounded px-2"
            onClick={handleLinkClick}
          >
            {isExpanded && <Link to="/signin">Sign In</Link>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
