import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching event details");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) return navigate("/login");

    try {
      setRegistering(true);
      await API.post(
        `/registrations/${id}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      alert("Registered successfully!");
      fetchEvent();
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    } finally {
      setRegistering(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading || !event)
    return <p className="text-center mt-8 text-gray-500">Loading event...</p>;

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      {/* Hero / Placeholder */}
      <div className="h-64 bg-indigo-100 rounded-lg flex items-center justify-center">
        <span className="text-indigo-400 text-5xl">🎉</span>
      </div>

      {/* Event Info */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-800">{event.name}</h2>
        <p className="text-gray-600">{event.description}</p>

        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            {event.category}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Capacity: {event.capacity}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            Date: {eventDate}
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            Location: {event.location}
          </span>
        </div>

        {/* Register Button */}
        {user ? (
          <button
            onClick={handleRegister}
            disabled={registering}
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transform transition duration-200 disabled:opacity-50"
          >
            {registering ? "Registering..." : "Register"}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="mt-4 w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600"
          >
            Login to Register
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;
