import mongoose from "mongoose";

const BenchmarkSchema = new mongoose.Schema(
  {
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
    companyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Benchmark = mongoose.model("Benchmark", BenchmarkSchema);
