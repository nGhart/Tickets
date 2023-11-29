const Single = require("../models/singleModel");

const getAllSingles = async (req, res) => {
  try {
    const number = await Single.countDocuments();
    const singles = await Single.find({}).sort({ createdAt: -1 });

    res.status(200).json({ number: number, singles });
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

module.exports = {
  createSingle,
  getAllSingles,
  getSingleSingle,
  updateSingle,
  deleteSingle,
};
