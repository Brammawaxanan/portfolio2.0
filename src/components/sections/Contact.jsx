import { useState } from "react";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";

export function Contact() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const isSending = status.type === "sending";

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus({ type: "sending", message: "Sending message..." });

    try {
      const response = await fetch(contactApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        setStatus({
          type: "error",
          message: payload.message || "Unable to send your message right now.",
        });
        return;
      }

      form.reset();
      setStatus({ type: "success", message: payload.message || "Message received." });
    } catch {
      setStatus({
        type: "error",
        message: "Unable to reach the contact service right now.",
      });
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <Reveal>
          <SectionTitle title="Contact" subtitle="If you want to say anything, contact me." />
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-info-list" effect="slide-right">
            <article className="contact-info-item">
              <i className="bi bi-geo-alt" aria-hidden="true" />
              <div>
                <h3>Address</h3>
                <p>108, Lower Road, Orr's hill, Trincomalee, Sri Lanka.</p>
              </div>
            </article>
            <article className="contact-info-item">
              <i className="bi bi-telephone" aria-hidden="true" />
              <div>
                <h3>Call Us</h3>
                <p>+94 761764440</p>
              </div>
            </article>
            <article className="contact-info-item">
              <i className="bi bi-envelope" aria-hidden="true" />
              <div>
                <h3>Email Us</h3>
                <p>sbwaxan@gmail.com</p>
              </div>
            </article>
          </Reveal>

          <Reveal
            as="form"
            className="contact-form"
            action={contactApiUrl}
            method="post"
            effect="slide-left"
            delay={90}
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <input type="text" name="name" placeholder="Your Name" required disabled={isSending} />
              <input type="email" name="email" placeholder="Your Email" required disabled={isSending} />
            </div>
            <input type="text" name="subject" placeholder="Subject" required disabled={isSending} />
            <textarea name="message" rows="6" placeholder="Message" required disabled={isSending} />
            <button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
            {status.message && (
              <p className={`form-status form-status-${status.type}`} role="status">
                {status.message}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
