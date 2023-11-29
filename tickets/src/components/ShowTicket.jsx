import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Back from "./Back.jsx";
import Loading from "./Loading.jsx";
import singleTicket from "../assets/Single.png";
import doubleTicket from "../assets/Couples.png";

const ShowTicket = () => {
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4111/single/${id}`)
      .then((response) => {
        setTicket(response.data.single);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p4">
      <Back />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="max-w-sm my-10 bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-t-lg"
              src={ticket.ticket === "Single" ? singleTicket : doubleTicket}
              alt="Ticket"
            />
            <div className="p-5">
              <div className="flex  justify-between">
                <span>Name:</span>
                <span>{ticket.name}</span>
              </div>
              <div className="flex  justify-between">
                <span>Ticket Number:</span>
                <span>{ticket._id.slice(18)}</span>
              </div>
            </div>
          </div>

          <a
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ticket Details
            </h5>
            <div class="font-normal text-gray-700 dark:text-gray-400">
              <div className="flex  justify-between">
                <span>Type:</span>
                <span>{ticket.ticket}</span>
              </div>
              <div className="flex  justify-between">
                <span>Ticket Number:</span>
                <span>{ticket._id}</span>
              </div>
              <div className="flex  justify-between">
                <span>Mode of Payment</span>
                <span>{ticket.payment}</span>
              </div>
              <div className="flex  justify-between">
                <span>Authorised by:</span>
                <span>{ticket.received}</span>
              </div>
              <div className="flex  justify-between">
                <span>Status:</span>
                <span>{ticket.status}</span>
              </div>
              <div className="flex  justify-between">
                <span>Purchased:</span>
                <span>
                  {new Date(ticket.createdAt).toString().slice(0, 15)}
                </span>
              </div>
              <div className="flex  justify-between">
                <span>Modified:</span>
                <span>
                  {new Date(ticket.updatedAt).toString().slice(0, 15)}
                </span>
              </div>
            </div>
          </a>
        </>
      )}
    </div>
  );
};

export default ShowTicket;
