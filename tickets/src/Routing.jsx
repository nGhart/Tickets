import React from "react";
import Tickets from "./components/Tickets";
import AddTicket from "./components/AddTicket";
import ShowTicket from "./components/ShowTicket";
import DeleteTicket from "./components/DeleteTicket";
import EditTicket from "./components/EditTicket";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Tickets />} />
      <Route path="/ticket/add" element={<AddTicket />} />
      <Route path="/ticket/show/:id" element={<ShowTicket />} />
      <Route path="/ticket/delete/:id" element={<DeleteTicket />} />
      <Route path="/ticket/edit/:id" element={<EditTicket />} />
    </Routes>
  );
};

export default Routing;
