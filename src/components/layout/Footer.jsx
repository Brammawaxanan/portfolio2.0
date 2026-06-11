import { SocialLinks } from "../ui/SocialLinks.jsx";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container text-center">
        <h2>Brammawaxanan Sivanantharajah</h2>
        <p>Web Designer | Web Developer</p>
        <SocialLinks />
        <div className="copyright">
          <span>Copyright</span> <strong>SB Waxan</strong>{" "}
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
