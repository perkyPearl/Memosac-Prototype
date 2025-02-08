import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const navigate = useNavigate();
    const { setUserInfo, userInfo } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference to dropdown to close when clicking outside

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []); // Empty dependency array to only run on mount

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
                setUserInfo(null); // Clear user info on error
            });
    }, [setUserInfo]); // Dependency array to ensure this runs only when `setUserInfo` changes

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
    
    const username = userInfo ? userInfo.username : "Default username";
    function handleLogoClick() {
        if (username !== "Default username") {
            navigate("/index");
        } else {
            navigate("/");
        }
    }

    return (
        <header className="NavBar">
            <div
                onClick={handleLogoClick}
                className="logo"
                style={{ cursor: "pointer" }}>
                Memosac
            </div>

            <nav>
                {username !== "Default username" ? (
                    <>
                        <Link to="/create">Create new post</Link>
                        <Link to="/gallery">Public Gallery</Link>
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
