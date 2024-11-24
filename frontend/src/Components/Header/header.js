import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            {/* Right Button */}
            <button id="HomeBtn" onClick={() => navigate("/")}>
                NovaFit
            </button>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>

            {/* Left Buttons */}
            <div className="right-buttons">
                <button id="LoginBtn" onClick={() => navigate("/login")}>
                    Log In
                </button>
                <button id="SignupBtn" onClick={() => navigate("/signup")}>
                    Sign Up
                </button>
            </div>            
        </header>
    );
}

export default Header;


// import React from "react";
// import "./header.css";

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo">NovaFit</div>
//       <nav>
//         <ul>
//           <li><a href="#spots">Basketball</a></li>
//           <li><a href="#spots">Futsal</a></li>
//           <li><a href="#spots">Football</a></li>
//           <li><a href="#spots">Fitness</a></li>
//         </ul>
//       </nav>
//       <div className="auth-buttons">
//         <button className="login">Log In</button>
//         <button className="signup">Sign Up</button>
//       </div>
//     </header>
//   );
// };

// export default Header;
