import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await API.get("/registrations/my-events");
      setRegistrations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [user]);

  const handleCancel = async (eventId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?"))
      return;

    try {
      await API.delete(`/registrations/${eventId}`);
      alert("Registration cancelled");
      fetchRegistrations();
    } catch (err) {
      alert(err.response?.data?.message || "Error cancelling registration");
    }
  };

  const today = new Date();
  const upcoming = registrations.filter((r) => new Date(r.event.date) > today);
  const past = registrations.filter((r) => new Date(r.event.date) <= today);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-400 text-lg font-medium animate-pulse">
        Loading your events...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-3">
        Your Registered Events
      </h1>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Upcoming Events
        </h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-500 italic">No upcoming events registered.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((r) => (
              <div
                key={r._id}
                className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">
                    {r.event.name}
                  </h3>
                  <p className="text-gray-500 mb-1">
                    📅 {new Date(r.event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mb-2">📍 {r.event.location}</p>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full font-medium">
                    Upcoming
                  </span>
                </div>
                <button
                  onClick={() => handleCancel(r.event._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-sm"
                >
                  Cancel Registration
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Past Events
        </h2>

        {past.length === 0 ? (
          <p className="text-gray-500 italic">You have no past events.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((r) => (
              <div
                key={r._id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:bg-gray-100 transition-colors duration-300"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {r.event.name}
                  </h3>
                  <p className="text-gray-500 mb-1">
                    📅 {new Date(r.event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mb-2">📍 {r.event.location}</p>
                  <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-full font-medium">
                    Past
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
