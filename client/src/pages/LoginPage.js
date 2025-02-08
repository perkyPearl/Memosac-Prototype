import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        console.log("Response Headers:", response.headers);

        if (response.ok) {
            const userInfo = await response.json();
            console.log("User Info:", userInfo); // Debug info
            setUserInfo(userInfo);
                    localStorage.setItem("token", userInfo.token);

            setRedirect(true);
        } else {
            const error = await response.json();
            console.error("Login Error:", error); // Debug error
            alert(error.message || "Login failed");
        }
    }

    if (redirect) {
        return <Navigate to="/index" />;
    }

    return (
        <form
            className="login default-form-input default-form-button"
            onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}
