const Candidate = require("../models/Candidate");

// @desc    Create Candidate
// @route   POST /api/candidates
const createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get All Candidates
// @route   GET /api/candidates
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get Single Candidate
// @route   GET /api/candidates/:id
const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Update Candidate
// @route   PUT /api/candidates/:id
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Delete Candidate
// @route   DELETE /api/candidates/:id
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    await candidate.deleteOne();

    res.status(200).json({
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate,
};