import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'error'|'success', text: '' }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple client validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      // Try parsing JSON safely. If server returned non-JSON, capture the text for debugging.
      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        const text = await res.text();
        // Log full non-JSON response to console for debugging (not shown to user).
        console.error("Non-JSON response from /api/contact:", text);
        throw new Error("Server returned an unexpected response. Check logs.");
      }

      if (!res.ok) {
        const errMsg = data?.error || data?.message || "Server error";
        setStatus({ type: "error", text: `Failed: ${errMsg}` });
        setLoading(false);
        return;
      }

      setStatus({ type: "success", text: "Message sent — thank you!" });
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      console.error("Submit error:", err);
      setStatus({
        type: "error",
        text: "Something went wrong while sending. If this continues, please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h3>Contact us</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Name</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Message</label>
          <br />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send message"}
        </button>
      </form>

      {status && (
        <div style={{ marginTop: 12, color: status.type === "error" ? "crimson" : "green" }}>
          {status.text}
        </div>
      )}
    </div>
  );
}
