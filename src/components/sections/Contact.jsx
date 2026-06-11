import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";

export function Contact() {
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

          <Reveal as="form" className="contact-form" action="/forms/contact.php" method="post" effect="slide-left" delay={90}>
            <div className="form-grid">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" rows="6" placeholder="Message" required />
            <button type="submit">Send Message</button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
