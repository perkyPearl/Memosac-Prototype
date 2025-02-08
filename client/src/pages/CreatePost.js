// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        const data = new FormData();
        data.append("title", title);
        data.append("summary", summary);
        data.append("content", content);
        if (files && files[0]) {
            data.append("file", files[0]);
        }
        ev.preventDefault();

        const response = await fetch("http://localhost:4000/post", {
            method: "POST",
            body: data,
            credentials: "include",
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <form className="post-form" onSubmit={createNewPost}>
            <input
                type="text"
                placeholder={"Title"}
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                required
            />
            <input
                type="summary"
                placeholder={"Summary"}
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
                required
            />
            <input
                type="file"
                name="file"
                onChange={(ev) => setFiles(ev.target.files)}
                required
            />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: "5px" }}>Create post</button>
        </form>
    );
}
