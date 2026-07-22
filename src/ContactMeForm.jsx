import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const FORM_ENDPOINT = "https://formspree.io/f/mdkazlkg";
const RATE_LIMIT_KEY = "portfolio-contact-attempts-v1";
const PROVIDER_BLOCK_KEY = "portfolio-contact-provider-block-v1";
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000;
const ATTEMPT_COOLDOWN_MS = 15 * 60 * 1000;
const MAX_BROWSER_ATTEMPTS = 3;
const MAX_EMAIL_DELIVERIES = 1;
const MIN_COMPLETION_MS = 3000;
let memoryAttempts = [];
let memoryProviderBlock = 0;

const formatWait = (milliseconds) => {
  const minutes = Math.max(1, Math.ceil(milliseconds / 60000));
  if (minutes < 60) return `${minutes} MIN`;
  const hours = Math.ceil(minutes / 60);
  return `${hours} HOUR${hours === 1 ? "" : "S"}`;
};

const readAttempts = (now) => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(RATE_LIMIT_KEY) ?? "[]");
    if (!Array.isArray(stored)) return [];
    memoryAttempts = stored.filter(
      (attempt) =>
        Number.isFinite(attempt?.at) &&
        typeof attempt?.emailHash === "string" &&
        now - attempt.at < RATE_WINDOW_MS,
    );
    return memoryAttempts;
  } catch {
    memoryAttempts = memoryAttempts.filter((attempt) => now - attempt.at < RATE_WINDOW_MS);
    return memoryAttempts;
  }
};

const writeAttempts = (attempts) => {
  memoryAttempts = attempts;
  try {
    window.localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempts));
  } catch {
    // Storage can be unavailable in strict privacy modes.
  }
};

const hashEmail = async (email) => {
  const normalized = email.trim().toLowerCase();

  if (window.crypto?.subtle) {
    const data = new TextEncoder().encode(normalized);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  let hash = 2166136261;
  for (const character of normalized) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `fallback-${(hash >>> 0).toString(16)}`;
};

const getProviderBlock = (now) => {
  try {
    const blockedUntil = Number(window.localStorage.getItem(PROVIDER_BLOCK_KEY));
    memoryProviderBlock =
      Number.isFinite(blockedUntil) && blockedUntil > now ? blockedUntil : 0;
    return memoryProviderBlock;
  } catch {
    return memoryProviderBlock > now ? memoryProviderBlock : 0;
  }
};

const saveProviderBlock = (blockedUntil) => {
  memoryProviderBlock = blockedUntil;
  try {
    window.localStorage.setItem(PROVIDER_BLOCK_KEY, String(blockedUntil));
  } catch {
    // Storage can be unavailable in strict privacy modes.
  }
};

const getRetryAt = (response, now) => {
  const retryAfter = response.headers.get("Retry-After");
  if (!retryAfter) return now + RATE_WINDOW_MS;

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds)) return now + seconds * 1000;

  const date = Date.parse(retryAfter);
  return Number.isFinite(date) ? date : now + RATE_WINDOW_MS;
};

function ContactMeForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const openedAtRef = useRef(Date.now());
  const submittingRef = useRef(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status !== "sending") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const now = Date.now();
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
    };

    if (honeypot) {
      setFormData({ name: "", email: "", message: "" });
      setStatus("sent");
      setStatusMessage("MESSAGE RECEIVED. THE INTERNET WORKS.");
      return;
    }

    if (now - openedAtRef.current < MIN_COMPLETION_MS) {
      setStatus("limited");
      setStatusMessage("GIVE IT A FEW SECONDS, THEN SEND AGAIN.");
      return;
    }

    const providerBlockedUntil = getProviderBlock(now);
    if (providerBlockedUntil) {
      setStatus("limited");
      setStatusMessage(
        `EMAIL GATE IS COOLING DOWN. TRY AGAIN IN ${formatWait(providerBlockedUntil - now)}.`,
      );
      return;
    }

    const emailHash = await hashEmail(payload.email);
    const attempts = readAttempts(now);
    const latestAttempt = attempts.reduce(
      (latest, attempt) => Math.max(latest, attempt.at),
      0,
    );
    const deliveredForEmail = attempts.filter(
      (attempt) => attempt.emailHash === emailHash && attempt.delivered,
    );

    if (deliveredForEmail.length >= MAX_EMAIL_DELIVERIES) {
      const retryAt = deliveredForEmail[0].at + RATE_WINDOW_MS;
      setStatus("limited");
      setStatusMessage(
        `ONE MESSAGE PER EMAIL PER DAY. TRY AGAIN IN ${formatWait(retryAt - now)}.`,
      );
      return;
    }

    if (latestAttempt && now - latestAttempt < ATTEMPT_COOLDOWN_MS) {
      setStatus("limited");
      setStatusMessage(
        `TRANSMISSION COOLDOWN ACTIVE. TRY AGAIN IN ${formatWait(
          latestAttempt + ATTEMPT_COOLDOWN_MS - now,
        )}.`,
      );
      return;
    }

    if (attempts.length >= MAX_BROWSER_ATTEMPTS) {
      const retryAt = Math.min(...attempts.map((attempt) => attempt.at)) + RATE_WINDOW_MS;
      setStatus("limited");
      setStatusMessage(
        `DAILY TRANSMISSION LIMIT REACHED. TRY AGAIN IN ${formatWait(retryAt - now)}.`,
      );
      return;
    }

    const attempt = { at: now, emailHash, delivered: false };
    writeAttempts([...attempts, attempt]);
    submittingRef.current = true;
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _gotcha: honeypot }),
      });

      if (response.status === 429) {
        const blockedUntil = getRetryAt(response, Date.now());
        saveProviderBlock(blockedUntil);
        setStatus("limited");
        setStatusMessage(
          `EMAIL SERVICE RATE LIMIT REACHED. TRY AGAIN IN ${formatWait(
            blockedUntil - Date.now(),
          )}.`,
        );
        return;
      }

      if (!response.ok) throw new Error("Message failed");

      const completedAttempts = readAttempts(Date.now());
      const currentAttempt = completedAttempts.find(
        (entry) => entry.at === attempt.at && entry.emailHash === attempt.emailHash,
      );
      if (currentAttempt) currentAttempt.delivered = true;
      writeAttempts(completedAttempts);

      setFormData({ name: "", email: "", message: "" });
      openedAtRef.current = Date.now();
      setStatus("sent");
      setStatusMessage("MESSAGE RECEIVED. THE INTERNET WORKS.");
    } catch {
      setStatus("error");
      setStatusMessage("TRANSMISSION FAILED. WAIT 15 MIN OR USE THE EMAIL LINK.");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section id="contact" className="contact-section paper-grid">
      <div className="contact-sticker">NO<br />BORING<br />EMAILS</div>
      <div className="page-shell contact-layout">
        <motion.div
          className="contact-copy"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="micro-label">08 / Open channel</span>
          <h2>
            GOT A PROBLEM
            <em>WORTH BUILDING?</em>
          </h2>
          <p>
            Roles, research, products, questionable startup ideas. Send the
            useful context and I&apos;ll bring the useful questions.
          </p>

          <div className="direct-links">
            {[
              { href: "mailto:apa168@sfu.ca", icon: <FiMail />, label: "EMAIL" },
              { href: "https://github.com/AlexanderPotiagalov", icon: <FiGithub />, label: "GITHUB", external: true },
              { href: "https://www.linkedin.com/in/alexander-potiagalov/", icon: <FiLinkedin />, label: "LINKEDIN", external: true },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
              >
                {link.icon} {link.label} <FiArrowUpRight />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <div className="form-topline">
            <span>TRANSMISSION FORM</span>
            <span>ENCRYPTION: VIBES</span>
          </div>
          <label className="contact-honeypot" aria-hidden="true">
            <span>LEAVE THIS FIELD EMPTY</span>
            <input
              type="text"
              name="_gotcha"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex="-1"
              autoComplete="off"
            />
          </label>
          {[
            { fieldLabel: "YOUR NAME", name: "name", type: "text", placeholder: "Who is this?", props: { autoComplete: "name", minLength: "2", maxLength: "80" } },
            { fieldLabel: "YOUR EMAIL", name: "email", type: "email", placeholder: "Where do I reply?", props: { autoComplete: "email", maxLength: "254" } },
          ].map((field, i) => (
            <motion.label
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 }}
            >
              <span>{field.fieldLabel}</span>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                {...field.props}
              />
            </motion.label>
          ))}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.36 }}
          >
            <span>THE INTERESTING PART</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me what you're building, fixing, or thinking about."
              rows="6"
              minLength="20"
              maxLength="2000"
              required
            />
          </motion.label>
          <motion.button
            type="submit"
            disabled={status === "sending"}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.44 }}
          >
            {status === "sending" ? "SENDING..." : "SEND TRANSMISSION"}
            {status === "sent" ? <FiCheck /> : <FiArrowUpRight />}
          </motion.button>
          <p className={`form-status ${status}`} aria-live="polite">
            {statusMessage}
          </p>
        </motion.form>
      </div>
    </section>
  );
}

export default ContactMeForm;
