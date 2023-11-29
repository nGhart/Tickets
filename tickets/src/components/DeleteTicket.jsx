import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Back from "./Back";
import Loading from "./Loading";
import axios from "axios";
import { BASE_URL } from "../utilities";

const DeleteTicket = () => {
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/single/${id}`)
      .then((response) => {
        setTicket(response.data.single);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/single/${id}`)
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
      <h1 className="text-center">Delete Ticket</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-sm p-6 my-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Are you sure you want to delete this entry?
            </h5>
          </a>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Name:</span>
              <span>{ticket.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Type: </span>
              <span>{ticket.ticket}</span>
            </div>
            <div className="flex justify-between">
              <span>Ticket Number: </span>
              <span>{ticket._id}</span>
            </div>
          </div>
          <div className="text-center">
            <a
              onClick={handleDelete}
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteTicket;
