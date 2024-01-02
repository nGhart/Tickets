import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Loading from "./Loading";
import { BASE_URL } from "../utilities";
import { toast } from "react-toastify";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("");
  const [single, setSingle] = useState("");
  const [double, setDouble] = useState("");
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/single`)
      .then((response) => {
        setTickets(response.data.singles);
        setTotal(response.data.number);
        setSingle(response.data.single);
        setDouble(response.data.double);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/single/filter`, {
        ...filterOptions,
      })
      .then((response) => {
        if (response.data.msg === "No matching records found") {
          toast.error(response.data.msg);
          return false;
        } else {
          setTickets(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const itemsShown = tickets.slice(firstIndex, lastIndex);
  const noPages = Math.ceil(tickets.length / itemsPerPage);
  const numbers = [...Array(noPages).keys()].map((item) => item + 1);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== noPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  return (
    <>
      <h2 className="text-center">Tickets</h2>
      <Link to="/ticket/add">
        <h3 className="text-white my-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Ticket
        </h3>
      </Link>
      <div>
        <button>
        <a href="https://wa.link/y3jczy">whatsapp</a>
      </button>
        <form
          className="max-w-sm bg-white border p-3  border-gray-200 rounded-lg shadow  dark:border-gray-700"
          onSubmit={handleFilter}
        >
          <h1 className="text-center">Filter</h1>
          <div className="flex items-center mb-4 justify-between">
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              Ticket Holder
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-200 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ border: "2px solid grey" }}
              name="name"
              onChange={(e) =>
                setFilterOptions({
                  ...filterOptions,
                  name: e.target.value,
                })
              }
            />
          </div>

          <fieldset className="flex justify-between">
            <label>Ticket</label>
            <legend className="sr-only">Ticket</legend>

            <div className="flex items-center mb-4">
              <input
                id="ticket-0"
                type="radio"
                name="ticket"
                value=""
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                checked
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    ticket: e.target.value,
                  })
                }
              />
              <label
                // for="ticket-1"
                className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                All
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="ticket-1"
                type="radio"
                name="ticket"
                value="Single"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    ticket: e.target.value,
                  })
                }
              />
              <label
                // for="ticket-1"
                className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Single
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="ticket-2"
                type="radio"
                name="ticket"
                value="Double"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    ticket: e.target.value,
                  })
                }
              />
              <label
                // for="ticket-2"
                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Double
              </label>
            </div>
          </fieldset>

          <div className="text-center">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-50 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Filter
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-2 flex justify-around text-white bg-blue-700">
            <span>Total: {total}</span>
            <span>Single: {single}</span>
            <span>Couple: {double}</span>
          </div>
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
              {itemsShown.map((ticket, index) => {
                const newIndex = firstIndex + index;
                return (
                  <tr key={ticket._id}>
                    <td className="border border-slate-300 rounded-md p-1 text-center">
                      {newIndex + 1}
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
          <div className="pagination">
            <div className="page">
              <div className="pageContainer">
                <div className="prev">
                  <i onClick={prevPage}>Prev</i>
                </div>
                {numbers.map((item) => (
                  <div
                    key={item}
                    className={`${
                      currentPage === item ? "activePage" : "pages"
                    }`}
                  >
                    <i onClick={() => changePage(item)}>{item}</i>
                  </div>
                ))}
                <div className="next">
                  <i onClick={nextPage}>Next</i>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Tickets;
