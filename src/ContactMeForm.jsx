import React, { useState } from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

function ContactMeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/mdkazlkg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message. Try again later.");
    }
  };

  const contactInfo = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/alexander-potiagalov/",
      icon: <FaLinkedin />,
      className: "linkedin-btn",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/a_lex_pot/?hl=en",
      icon: <FaInstagram />,
      className: "instagram-btn",
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/alexander.potiagalov.7/",
      icon: <FaFacebook />,
      className: "facebook-btn",
    },
    {
      name: "Twitter",
      link: "https://x.com/a_lex_pot",
      icon: <FaTwitter />,
      className: "twitter-btn",
    },
    {
      name: "Phone",
      icon: <FaPhone />,
      displayText: "604-352-5948",
      className: "phone-btn",
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      displayText: "apa168@sfu.ca",
      className: "email-btn",
    },
  ];

  return (
    <section id="contact-me" className="contact-section">
      <h2 className="contact-heading">Get in Touch</h2>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="animated-gradient-button">
          Send Message
        </button>
      </form>

      {/* Contact Links */}
      <div className="contact-container">
        {contactInfo.map((info, index) => (
          <a
            key={index}
            href={info.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-btn ${info.className}`}
          >
            <div className="contact-icon">{info.icon}</div>
            <span className="contact-text">
              {info.displayText || info.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ContactMeForm;
