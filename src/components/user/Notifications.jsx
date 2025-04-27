import { Link } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications";

function Notifications({ user }) {
  const { notifications } = useNotifications(user);

  if (!user) {
    return (
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p>Please sign in to view notifications.</p>
          <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="p-2 border-b dark:border-gray-700">
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;