const Single = require("../models/singleModel");

const getAllSingles = async (req, res) => {
  try {
    const number = await Single.countDocuments();

    const single = await Single.find({ ticket: "Single" });
    const double = await Single.find({ ticket: "Double" });
    const singleCount = single.length;
    const doubleCount = double.length;
    const singles = await Single.find({}).sort({ createdAt: -1 });

    res
      .status(200)
      .json({
        number: number,
        single: singleCount,
        double: doubleCount,
        singles,
      });
  } catch (error) {
    console.log(error);
    res.json({ msg: error.message });
  }
};
const getSingleSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const single = await Single.findById(id);
    if (!single) {
      return res.json({ msg: "Ticket does not exist" });
    }
    res.status(200).json({ single });
  } catch (error) {
    console.log(error);
    res.json({ msg: error.message });
  }
};

const createSingle = async (req, res) => {
  try {
    const { name, payment, received, status, ticket } = req.body;
    const single = await Single.create({
      name,
      payment,
      received,
      status,
      ticket,
    });
    res.status(200).json({ msg: "Single ticket added", single });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const updateSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, payment, received, status, ticket } = req.body;

    const single = await Single.findByIdAndUpdate(id, req.body);
    if (!single) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const deleteSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSingle = await Single.findByIdAndDelete(id);
    if (!deletedSingle) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    return res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const filterTickets = async (req, res) => {
  const { name, ticket } = req.body;

  try {
    const query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    if (ticket) {
      query.ticket = ticket;
    }
    const matchedTickets = await Single.find(query);
    if (matchedTickets.length === 0) {
      return res.json({ msg: "No matching records found" });
    }
    return res.json(matchedTickets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createSingle,
  getAllSingles,
  getSingleSingle,
  updateSingle,
  filterTickets,
  deleteSingle,
};
