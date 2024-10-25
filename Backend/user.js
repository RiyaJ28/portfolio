import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User route is displaying data");
});

// Export the router as the default export
export default router;
