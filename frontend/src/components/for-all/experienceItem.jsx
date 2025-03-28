import React from "react";
import { motion } from "framer-motion";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

function ExperienceItem({ start, end, companyName, position, responsibilities }) {
  const centerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, type: "spring", bounce: 0.1 } },
  };

  // Function to format date as "MMM YYYY"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" }); // "Nov 2024"
  };

  return (
    <motion.div variants={centerVariants} initial="hidden" whileInView="visible" className="mb-4">
      
      {/* Desktop View */}
      <div className="d-none d-sm-flex row align-items-center justify-content-center" id="ExperienceItem">
        <div className="col-sm-3 text-sm-end">
          {formatDate(start)} - {formatDate(end)}
        </div>
        <div className="col-sm-1 text-center">
          <PlayCircleFilledWhiteIcon fontSize="large" />
        </div>
        <div className="col-sm-5">
          <h3>{companyName}</h3>
          <p>{position}</p>
          <ul>
            {responsibilities.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile View (Fixed Layout) */}
      <div className="d-flex d-sm-none flex-column ms-3">
        <div className="d-flex align-items-center gap-3">
          <PlayCircleFilledWhiteIcon fontSize="large" />
          <div>
            <h3 className="mb-0">{companyName}</h3>
            <p className="fw-bold mb-0">{position}</p>
            <p className="text-muted mb-2">
              {formatDate(start)} - {formatDate(end)}
            </p>
          </div>
        </div>
        
        {/* Responsibilities List */}
        <ul className="text-start mt-2">
          {responsibilities.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
      
    </motion.div>
  );
}

export default ExperienceItem;
