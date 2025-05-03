import { Link } from "react-router-dom";
import { useTasks } from "../../hooks/usetasks";
import image from "../../assets/profileImg.png";

function Profile({ user }) {
  const { tasks } = useTasks(user);

  if (!user) {
    return (
      <div className="p-4">
        <div className="bg-[#A2B8F9] p-4 rounded shadow">
          <p>Please sign in to view your profile.</p>
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const taskStats = {
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    deployed: tasks.filter((t) => t.status === "deployed").length,
    deferred: tasks.filter((t) => t.status === "deferred").length,
  };

  // Construct full name, handling missing firstName or lastName
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "Unknown";

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div>
        <div className="flex flex-col md:flex-row gap-4 items-center ">
          <img src={image} alt="" />
          <div className="flex flex-col gap-2">
            <p className="text-2xl">{fullName}</p>
            <p className="text-lg">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="w-50 bg-white shadow p-4 flex flex-col gap-3 rounded-lg">
            <p className="text-xl font-semibold text-zinc-700">Pending Tasks</p>
            <div className="border-l-4 border-zinc-700 pl-2 rounded">
              <p className="text-2xl">{taskStats.pending}</p>
            </div>
          </div>
          <div className="w-50 bg-white shadow p-4 flex flex-col gap-3 rounded-lg">
            <p className="text-xl font-semibold text-green-700">
              Completed Tasks
            </p>
            <div className="border-l-4 border-green-700 pl-2 rounded">
              <p className="text-2xl">{taskStats.completed}</p>
            </div>
          </div>
          <div className="w-50 bg-white shadow p-4 flex flex-col gap-3 rounded-lg">
            <p className="text-xl font-semibold text-sky-700">
              In Progress Task
            </p>
            <div className="border-l-4 border-sky-700 pl-2 rounded">
              <p className="text-2xl">{taskStats.inProgress}</p>
            </div>
          </div>
          <div className="w-50 bg-white shadow p-4 flex flex-col gap-3 rounded-lg">
            <p className="text-xl font-semibold text-indigo-700">
              Deployed Tasks
            </p>
            <div className="border-l-4 border-indigo-700 pl-2 rounded">
              <p className="text-2xl">{taskStats.deployed}</p>
            </div>
          </div>
          <div className="w-50 bg-white shadow p-4 flex flex-col gap-3 rounded-lg">
            <p className="text-xl font-semibold text-yellow-700">
              Deferred Tasks
            </p>
            <div className="border-l-4 border-yellow-700 pl-2 rounded">
              <p className="text-2xl">{taskStats.deferred}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
