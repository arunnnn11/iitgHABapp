import express from "express";

import {
  authenticateJWT,
  authenticateHabJWT,
} from "../../middleware/authenticateJWT.js";

import {
  listEvents,
  getEvent,
  registerForEvent,
  cancelEventRegistration,
  checkInAttendee,
  getVolunteerStats,
  adminListEvents,
  adminGetEvent,
  adminCreateEvent,
  adminUpdateEvent,
  adminDeleteEvent,
  adminListRegistrations,
  adminApproveRegistration,
  adminRejectRegistration,
  adminSetVolunteers,
} from "./eventController.js";

const eventRouter = express.Router();

// HAB (static /admin paths before /:eventId)
eventRouter.get("/admin", authenticateHabJWT, adminListEvents);
eventRouter.post("/admin", authenticateHabJWT, adminCreateEvent);
eventRouter.get("/admin/:eventId", authenticateHabJWT, adminGetEvent);
eventRouter.patch("/admin/:eventId", authenticateHabJWT, adminUpdateEvent);
eventRouter.delete("/admin/:eventId", authenticateHabJWT, adminDeleteEvent);
eventRouter.get(
  "/admin/:eventId/registrations",
  authenticateHabJWT,
  adminListRegistrations,
);
eventRouter.post(
  "/admin/:eventId/registrations/:registrationId/approve",
  authenticateHabJWT,
  adminApproveRegistration,
);
eventRouter.post(
  "/admin/:eventId/registrations/:registrationId/reject",
  authenticateHabJWT,
  adminRejectRegistration,
);
eventRouter.put(
  "/admin/:eventId/volunteers",
  authenticateHabJWT,
  adminSetVolunteers,
);

// App: students
eventRouter.get("/", authenticateJWT, listEvents);
eventRouter.get("/:eventId", authenticateJWT, getEvent);
eventRouter.post("/:eventId/register", authenticateJWT, registerForEvent);
eventRouter.delete("/:eventId/register", authenticateJWT, cancelEventRegistration);

// App: volunteers
eventRouter.post("/:eventId/check-in", authenticateJWT, checkInAttendee);
eventRouter.get("/:eventId/check-in/stats", authenticateJWT, getVolunteerStats);

export default eventRouter;
