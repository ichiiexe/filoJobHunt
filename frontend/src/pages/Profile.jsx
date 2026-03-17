import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { currUser, logout } = useAuth();

  if (!currUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <p className="mt-1 text-sm text-gray-100">{currUser.fullname}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-100">{currUser.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Role
            </label>
            <p className="mt-1 text-sm text-gray-100 capitalize">
              {currUser.role}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Member Since
            </label>
            <p className="mt-1 text-sm text-gray-100">
              {new Date(currUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
