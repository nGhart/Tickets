import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Back from "./Back";
import Loading from "./Loading";
import axios from "axios";

const EditTicket = () => {
  const [name, setName] = useState("");
  const [received, setReceived] = useState("");
  const [ticket, setTicket] = useState("");
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ticket-wnbi.onrender.com/single/${id}`)
      .then((response) => {
        setName(response.data.single.name);
        setReceived(response.data.single.received);
        setTicket(response.data.single.ticket);
        setPayment(response.data.single.payment);
        setStatus(response.data.single.status);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    const data = { name, ticket, received, payment, status };
    setLoading(true);
    axios
      .patch(`https://ticket-wnbi.onrender.com/single/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <Back />

      <h2 className="text-center">Edit Ticket</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-md mx-auto my-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute mb-25 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">
              Name
            </label>
          </div>

          {/* <div className="relative z-0 w-full mb-5 group">
            <div className="flex justify-between">
              <label
              // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Ticket
              </label>{" "}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="single"
                  name="ticket"
                  value="Single"
                  checked={ticket === "Single"}
                  onChange={(e) => setTicket(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="single">Single</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="couple"
                  name="ticket"
                  value="Couple"
                  checked={ticket === "Couple"}
                  onChange={(e) => setTicket(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="couple">Couple</label>
              </div>
            </div>
          </div> */}
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="ticket"
              id="ticket"
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
            </select>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Ticket
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <select
                name="payment"
                id="payment"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Mobile Money">Mobile Money</option>
              </select>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Payment
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="received"
                id="received"
                value={received}
                onChange={(e) => setReceived(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Received by
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              >
                <option value="">Select</option>
                <option value="Pending">Pending</option>
                <option value="Admitted">Admitted</option>
              </select>
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Status
              </label>
            </div>
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditTicket;
