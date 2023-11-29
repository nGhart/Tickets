import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Loading from "./Loading";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:4111/single")
      .then((response) => {
        setTickets(response.data.singles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <h2 className="text-center">Tickets</h2>
      <Link to="/ticket/add">
        {/* <GrAdd /> */}
        <h3 className="text-white my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Ticket
        </h3>
      </Link>
      {loading ? (
        <Loading />
      ) : (
        <table className="table-auto w-full border-separate border-spacing-2 border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300 rounded-md "></th>
              <th className="border border-slate-300 rounded-md p-1 text-center">
                Name
              </th>

              <th className="border border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => {
              return (
                <tr key={ticket._id}>
                  <td className="border border-slate-300 rounded-md p-1 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-300 rounded-md p-1 text-center">
                    {ticket.name}
                  </td>

                  <td className="border border-slate-300 rounded-md p-1 text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`ticket/show/${ticket._id}`}>
                        <BsInfoCircle />
                      </Link>
                      {/* <Link to={`ticket/${ticket._id}`}>
                        <RxShare1 />
                      </Link> */}
                      <Link to={`ticket/edit/${ticket._id}`}>
                        <AiOutlineEdit />
                      </Link>
                      <Link to={`ticket/delete/${ticket._id}`}>
                        <MdOutlineDeleteOutline className="text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Tickets;
