import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    venue: { type: String, default: "", trim: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, default: null },
    // Registrations close at this time; falls back to endsAt, then startsAt.
    registrationClosesAt: { type: Date, default: null },
    // 0 means unlimited.
    capacity: { type: Number, default: 0, min: 0 },
    // If true, HAB approves each registration; otherwise it is approved instantly.
    requiresApproval: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // Seats taken by approved registrations; kept in sync atomically.
    approvedCount: { type: Number, default: 0, min: 0 },
    createdBy: { type: String, default: "" },
  },
  { timestamps: true },
);

eventSchema.index({ isPublished: 1, startsAt: 1 });
eventSchema.index({ volunteers: 1 });

export const Event = mongoose.model("Event", eventSchema);
