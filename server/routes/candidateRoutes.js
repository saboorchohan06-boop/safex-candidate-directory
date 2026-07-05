const express = require("express");

const {
  createCandidate,
  getCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");

const router = express.Router();

// Create Candidate
router.post("/", createCandidate);

// Get All Candidates
router.get("/", getCandidates);

// Get One Candidate
router.get("/:id", getCandidate);

// Update Candidate
router.put("/:id", updateCandidate);

// Delete Candidate
router.delete("/:id", deleteCandidate);

module.exports = router;