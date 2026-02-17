import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  // Format date nicely
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Optional image placeholder */}
      <div className="bg-indigo-100 h-36 flex items-center justify-center">
        <span className="text-indigo-400 font-bold text-xl">🎉</span>
      </div>

      <div className="p-5 space-y-3">
        {/* Category Badge */}
        {event.category && (
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
            {event.category}
          </span>
        )}

        {/* Event Name */}
        <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
          {event.name}
        </h3>

        {/* Location & Date */}
        <p className="text-gray-500 text-sm">
          {event.location} | {eventDate}
        </p>

        {/* Capacity Info */}
        <p className="text-gray-600 text-sm">
          Capacity: <span className="font-semibold">{event.capacity}</span>
        </p>

        {/* View Details Button */}
        <Link
          to={`/event/${event._id}`}
          className="block text-center mt-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transform transition duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
