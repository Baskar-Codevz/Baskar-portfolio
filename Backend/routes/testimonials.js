
import express from "express";
import jwt from "jsonwebtoken";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

// ========================================
// Admin authentication middleware
// ========================================
function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization;

  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      message: "Admin login required.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
}

// ========================================
// Admin login
// POST /api/testimonials/admin/login
// ========================================
router.post("/admin/login", (req, res) => {
  const { password } = req.body;

  if (
    typeof password !== "string" ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.JWT_SECRET ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Incorrect password or server configuration.",
    });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return res.json({
    token,
    message: "Login successful.",
  });
});

// ========================================
// Submit a testimonial
// POST /api/testimonials
// New reviews are always pending
// ========================================
router.post("/", async (req, res) => {
  try {
    const { clientName, company, role, message, rating } = req.body;

    if (
      typeof clientName !== "string" ||
      typeof message !== "string" ||
      clientName.trim().length < 2 ||
      clientName.trim().length > 80 ||
      message.trim().length < 10 ||
      message.trim().length > 1000
    ) {
      return res.status(400).json({
        message: "Please enter a valid name and feedback.",
      });
    }

    if (
      rating !== undefined &&
      rating !== null &&
      (!Number.isInteger(rating) || rating < 1 || rating > 5)
    ) {
      return res.status(400).json({
        message: "Rating must be a whole number from 1 to 5.",
      });
    }

    const testimonial = await Testimonial.create({
      clientName: clientName.trim(),
      company:
        typeof company === "string"
          ? company.trim().slice(0, 100)
          : "",
      role:
        typeof role === "string"
          ? role.trim().slice(0, 100)
          : "",
      message: message.trim(),
      rating: rating ?? null,
      status: "pending",
    });

    return res.status(201).json({
      message: "Thank you! Your feedback has been submitted for review.",
      id: testimonial._id,
    });
  } catch (error) {
    console.error("Testimonial submission failed:", error);

    return res.status(500).json({
      message: "Unable to submit feedback right now.",
    });
  }
});

// ========================================
// Get approved testimonials
// GET /api/testimonials/approved
// ========================================
router.get("/approved", async (_req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: "approved",
    })
      .select("clientName company role message rating createdAt")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.json(testimonials);
  } catch (error) {
    console.error("Loading testimonials failed:", error);

    return res.status(500).json({
      message: "Unable to load testimonials.",
    });
  }
});

// ========================================
// Get pending testimonials (admin only)
// GET /api/testimonials/admin/pending
// ========================================
router.get("/admin/pending", requireAdmin, async (_req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.json(testimonials);
  } catch (error) {
    console.error("Loading pending testimonials failed:", error);

    return res.status(500).json({
      message: "Unable to load pending testimonials.",
    });
  }
});

// ========================================
// Approve or reject a testimonial
// PATCH /api/testimonials/admin/:id/status
// ========================================
router.patch("/admin/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected.",
      });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        message: "Testimonial not found.",
      });
    }

    return res.json({
      message: `Testimonial ${status}.`,
      testimonial,
    });
  } catch (error) {
    console.error("Updating testimonial failed:", error);

    return res.status(500).json({
      message: "Unable to update testimonial.",
    });
  }
});

// ========================================
// DELETE ALL testimonials (admin only)
// DELETE /api/testimonials/admin/all
// Permanently deletes pending, approved,
// and rejected testimonials.
// ========================================
router.delete("/admin/all", requireAdmin, async (_req, res) => {
  try {
    const result = await Testimonial.deleteMany({});

    return res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
      message: `Successfully deleted ${result.deletedCount} testimonials.`,
    });
  } catch (error) {
    console.error("Deleting all testimonials failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete testimonials.",
    });
  }
});

export default router;