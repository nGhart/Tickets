const Double = require("../models/doubleModel");

const getAllDoubles = async (req, res) => {
  try {
    const number = await Double.countDocuments();
    const doubles = await Double.find({}).sort({ createdAt: -1 });

    res.status(200).json({ number: number, doubles });
  } catch (error) {
    console.log(error);
    res.json({ msg: error.message });
  }
};

const getSingleDouble = async (req, res) => {
  try {
    const { id } = req.params;
    const double = await Double.findById(id);
    if (!double) {
      return res.json({ msg: "Ticket does not exist" });
    }
    res.status(200).json({ double });
  } catch (error) {
    console.log(error);
    res.json({ msg: error.message });
  }
};

const createDouble = async (req, res) => {
  try {
    const { name, payment, received, status } = req.body;
    const double = await Double.create({ name, payment, received, status });
    res.status(200).json({ msg: "Double ticket added", double });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const updateDouble = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, payment, received, status } = req.body;
    if (!name || !payment || !received || !status) {
      return res.status(400).json({ msg: "Fill all required fields" });
    }
    const double = await Double.findByIdAndUpdate(id, req.body);
    if (!double) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const deleteDouble = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDouble = await Double.findByIdAndDelete(id);
    if (!deletedDouble) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    return res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createDouble,
  getAllDoubles,
  getSingleDouble,
  updateDouble,
  deleteDouble,
};
