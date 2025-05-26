'use client'

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from 'axios';
import { toast } from 'sonner'

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", deadline: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, { withCredentials: true });
      const fetchedOrders = response.data;  // Assuming response.data is the list of orders
      setOrders(
        fetchedOrders.map(order => ({
          title: `Order #${order.id}`,  // Assuming each order has an `id` and `date`
          start: order.created_at, // Assuming order has a `date` field
          description: `Customer: ${order.id}`, // Assuming customer info is available
          color: "#6366F1"  // Use a different color for orders
        }))
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
      const fetchedEvents = response.data;  // Assuming response.data is the list of orders
      setEvents(
        fetchedEvents.map(event => ({
          title: `${event.title}`,  // Assuming each order has an `id` and `date`
          start: event.deadline, // Assuming order has a `date` field
          description: `${event.description}`, // Assuming customer info is available
          color: "#6366F1"  // Use a different color for orders
        }))
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchEvents()
  }, []);

  // Handle date click (add event)
  const handleDateClick = (info) => {
    setNewEvent({ title: "", description: "", deadline: info.dateStr });
    setSelectedEvent(null);
    setShowModal(true);
  };

  // Handle event click (view event details)
  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowModal(true);
  };

  // Handle adding new event
  const handleAddEvent = async () => {
    try{
      if (newEvent.title.trim()) {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/events`, { event: newEvent })
        setEvents([...events, { title: newEvent.title, description: newEvent.description, start: newEvent.deadline, color: "#6366F1" }]);
        setShowModal(false);
        setNewEvent({ title: "", description: '', deadline: null });
        toast.success('Event successfully added!')
      }
    }catch(e){
      console.log(e)
    }
   
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">
      <h2 className="text-md font-semibold mb-4">Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[...orders, ...events]}  // Combine both orders and events
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
      />

      {/* Event Modal */}
      <Dialog open={showModal} onClose={setShowModal} className="relative z-10">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md" aria-hidden="true" />

        <div className="fixed inset-0 z-10 w-auto overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
              
              {/* Modal Header */}
              <div className="bg-white px-6 py-5 border-b border-gray-300">
                <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                  {selectedEvent ? "Event Details" : "Add Event"}
                </DialogTitle>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4">
                {selectedEvent ? (
                  <div className="space-y-3">
                    <p className="text-lg font-semibold">{selectedEvent.title}</p>
                    <p className="text-gray-600">{new Date(selectedEvent.start).toLocaleString()}</p>
                    <p className="text-gray-500">{selectedEvent.extendedProps?.description || "No description"}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold block text-left">Event Name</label>
                      <input
                        type="text"
                        placeholder="Enter event name"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold block text-left">Event Description</label>
                      <input
                        type="text"
                        placeholder="Enter description"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold block text-left">Date</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={newEvent.deadline}
                        onChange={(e) => setNewEvent({ ...newEvent, deadline: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                {!selectedEvent && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={handleAddEvent}
                  >
                    Add Event
                  </button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminCalendar;
