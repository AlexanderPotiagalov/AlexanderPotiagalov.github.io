import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function ContactMeForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/mdkazlkg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Message failed");
      setFormData({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section paper-grid">
      <div className="contact-sticker">NO<br />BORING<br />EMAILS</div>
      <div className="page-shell contact-layout" data-reveal>
        <div className="contact-copy">
          <span className="micro-label">07 / Open channel</span>
          <h2>
            GOT A PROBLEM
            <em>WORTH BUILDING?</em>
          </h2>
          <p>
            Roles, research, products, questionable startup ideas. Send the
            useful context and I&apos;ll bring the useful questions.
          </p>

          <div className="direct-links">
            <a href="mailto:apa168@sfu.ca"><FiMail /> EMAIL <FiArrowUpRight /></a>
            <a href="https://github.com/AlexanderPotiagalov" target="_blank" rel="noreferrer">
              <FiGithub /> GITHUB <FiArrowUpRight />
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-potiagalov/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin /> LINKEDIN <FiArrowUpRight />
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-topline">
            <span>TRANSMISSION FORM</span>
            <span>ENCRYPTION: VIBES</span>
          </div>
          <label>
            <span>YOUR NAME</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Who is this?"
              autoComplete="name"
              required
            />
          </label>
          <label>
            <span>YOUR EMAIL</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Where do I reply?"
              autoComplete="email"
              required
            />
          </label>
          <label>
            <span>THE INTERESTING PART</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me what you're building, fixing, or thinking about."
              rows="6"
              required
            />
          </label>
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "SENDING..." : "SEND TRANSMISSION"}
            {status === "sent" ? <FiCheck /> : <FiArrowUpRight />}
          </button>
          <p className={`form-status ${status}`} aria-live="polite">
            {status === "sent" && "MESSAGE RECEIVED. THE INTERNET WORKS."}
            {status === "error" && "TRANSMISSION FAILED. TRY THE EMAIL LINK."}
          </p>
        </form>
      </div>
    </section>
  );
}

export default ContactMeForm;
