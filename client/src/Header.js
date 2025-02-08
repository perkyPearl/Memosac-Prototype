import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import "./styles/App.css";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user profile");
        }
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setUserInfo(null);
      });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then(() => {
        setUserInfo(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }

  const username = userInfo?.username;

  function handleLogoClick() {
    if (username) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }

  return (
    <header className="NavBar">
      <div
        onClick={handleLogoClick}
        className="logo"
        style={{ cursor: "pointer" }}
      >
        Memosac
      </div>

      <nav>

                {username !== "Default username" ? (
                    <>
                    <Link to="/timecapsule">Time</Link>
                        <Link to="/create">Posts</Link>
                        <Link to="/gallery">Public Gallery</Link>
                        <Link to="/stories">Story</Link>
                        <div
                            className="dropdown"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            ref={dropdownRef} // Correct use of ref
                            style={{ cursor: "pointer" }}>
                            <span>
                                Hey, <b>{username}</b>
                            </span>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <a
                                        onClick={logout}
                                        style={{ cursor: "pointer" }}
                                        href="/">
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}