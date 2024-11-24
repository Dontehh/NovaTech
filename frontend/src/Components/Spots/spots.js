// import React from "react";
// import indoor from "./indoor.jpeg"
// import outdoor from "./outdoor.jpeg"
// import "./sportssection.css";

// function SportsSection() {
//   return (
//     <>
//     <h3> Spots </h3>
//     <div className="spots-section">
//       {/* Indoor Court Section */}
//       <div className="court-section indoor-court">
//         <div className="court-title">Indoor Court</div>
//         <img
//           src={indoor} // Replace with your actual image URL
//           alt="Indoor Court"
//           className="court-image"
//         />
//         <button className="see-all-button">See All</button>
//       </div>

//       {/* Outdoor Court Section */}
//       <div className="court-section outdoor-court">
//         <div className="court-title">Outdoor Court</div>
//         <img
//           src={outdoor}
//           alt="outdoor"
//           className="court-image"
//         />
//         <button className="see-all-button">See All</button>
//       </div>
//     </div>
//     </>
//   );
// }

// export default SportsSection;


import React from "react";
import indoor from "./indoor.jpeg";
import outdoor from "./outdoor.jpeg";
import "./spots.css";

const Spots = () => {
  const spots = [
    { title: "Indoor court", image: indoor }, // Correct usage
    { title: "Outdoor Court", image: outdoor }, // Correct usage
  ];

  return (
    <section id="spots" className="spots">
      <h2>Find your teammates and book</h2>
      <div className="spots-container">
        {spots.map((spot, index) => (
          <div key={index} className="spot-card">
            <img src={spot.image} alt={spot.title} />
            <h3>{spot.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spots;
