import { useEffect, useState } from "react";
import API from "../services/api";
import EventCard from "../components/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all events based on filters
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/events?search=${search}&category=${category}&location=${location}`,
      );
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unique categories & locations dynamically
  const fetchFilters = async () => {
    try {
      const res = await API.get("/events");
      const allEvents = res.data;

      setCategories([
        ...new Set(allEvents.map((e) => e.category).filter(Boolean)),
      ]);
      setLocations([
        ...new Set(allEvents.map((e) => e.location).filter(Boolean)),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [search, category, location]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-indigo-600 text-center">
        Discover Events
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Event Grid */}
      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500 mt-6 text-xl">
          No events found.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
