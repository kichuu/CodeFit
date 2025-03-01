import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: String,
    avatar: String,
    bio: String,
    location: String,
    joinedGithub: Date,
    topLanguages: [String],
    strengths: [String],
    weaknesses: [String],
    status: { type: String, enum: ["Pending", "Hired"], default: "Pending" },

    totalCommits: { type: Number, default: 0 },
    totalPRs: { type: Number, default: 0 },
    totalIssues: { type: Number, default: 0 },
    commitQualityScore: { type: Number, default: 0 },
    openSourceContributed : {type: String, enum: ["No", "Yes"] ,default: "No"},
    totalRepos:{ type: Number, default: 0 },
    codeReviewThoroughness:{type: String, enum: ["low", "medium", "high"] ,default: "medium"},
    // teamProjects : {type:Number},
    companyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }], // Companies that have access to this candidate

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Candidate = mongoose.model("Candidate", candidateSchema);
