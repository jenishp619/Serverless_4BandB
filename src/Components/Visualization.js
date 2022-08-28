import React from "react";

const VisualizeData = () => {
  return (
    <div>
        <h2 style={{ margin: "15px" }}>Visualizations</h2>
      <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>
        <a
          style={{ color: "black" }}
          href="https://datastudio.google.com/embed/reporting/505556cc-ebce-4576-83ba-cb6eac185f03/page/tEnnC"
          target="_blank"
        >
          Room Bookings
        </a>
      </button>
      <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>
        <a
          style={{ color: "black" }}
          href="https://datastudio.google.com/embed/reporting/e4b72486-7d91-456e-9a9d-b254d573f4bf/page/tEnnC"
          target="_blank"
        >
          Food Orders
        </a>
      </button>
      <button className="btn btn-light btn-outline-success" style={{ margin: "15px" }}>
        <a
          style={{ color: "black" }}
          href="https://datastudio.google.com/embed/reporting/c54ef4ce-e516-429d-b213-e4096d7f40e5/page/tEnnC"
          target="_blank"
        >
          Tour Bookings
        </a>
      </button>
    </div>
  );
};

export default VisualizeData;
