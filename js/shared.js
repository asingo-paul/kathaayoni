// Shared navigation and footer for all inner pages
const NAV_HTML = `
<div class="top-bar">
  <div class="container">
    <div class="top-bar-left">
      <div class="top-bar-item">
        <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#f5a623"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        info@kathaayoniacademy.ac.ke
      </div>
      <div class="top-bar-item">
        <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#f5a623"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        Nairobi, Kenya
      </div>
    </div>
    <div class="top-bar-right">
      <a href="jobs.html">Jobs</a>
      <a href="newsletter.html">Newsletter</a>
      <a href="tel:+254700000000">📞 +254 700 000 000</a>
    </div>
  </div>
</div>
<header class="header" id="header">
  <div class="container">
    <nav class="nav-container">
      <a href="../index.html" class="logo">
        <div class="logo-icon">KA</div>
        <div class="logo-text">
          <div class="school-name">Kathaayoni Academy</div>
          <div class="school-tagline">Junior School · Arise &amp; Shine</div>
        </div>
      </a>
      <ul class="nav-menu" id="navMenu">
        <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
        <li class="nav-item has-dropdown">
          <a class="nav-link" href="about.html">About Us</a>
          <ul class="dropdown">
            <li><a href="about.html">The School</a></li>
            <li><a href="junior-school.html">Junior School</a></li>
            <li><a href="academics.html">Academics</a></li>
            <li><a href="ict.html">ICT</a></li>
            <li><a href="science.html">Science</a></li>
            <li><a href="sports.html">Sports</a></li>
            <li><a href="clubs.html">Clubs &amp; Societies</a></li>
            <li><a href="faith.html">Faith &amp; Religion</a></li>
            <li><a href="counseling.html">Guidance &amp; Counseling</a></li>
            <li><a href="management.html">Management</a></li>
            <li><a href="achievers.html">Achievers Zone</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="curriculum.html">Curriculum</a></li>
        <li class="nav-item"><a class="nav-link" href="events.html">Events</a></li>
        <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
        <li class="nav-item"><a class="nav-link" href="news.html">Our News</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
        <li class="nav-item"><a class="nav-link nav-btn" href="contact.html#inquiry">Enroll Now</a></li>
      </ul>
      <div class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </nav>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-main">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <div class="footer-logo-icon">KA</div>
            <div>
              <div class="footer-logo-text">Kathaayoni Academy</div>
              <div class="footer-logo-sub">Junior School</div>
            </div>
          </div>
          <p class="footer-desc">We are a mixed Day and Boarding Junior School offering CBC education for Grades 7–9. Committed to excellence in academics, character, and holistic development.</p>
          <div class="footer-socials">
            <a class="social-btn" href="#">f</a>
            <a class="social-btn" href="#">t</a>
            <a class="social-btn" href="#">in</a>
            <a class="social-btn" href="#">▶</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <div class="footer-links">
            <a href="../index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="junior-school.html">Junior School</a>
            <a href="curriculum.html">Curriculum</a>
            <a href="events.html">Events</a>
            <a href="gallery.html">Gallery</a>
            <a href="contact.html">Contact Us</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Programmes</h4>
          <div class="footer-links">
            <a href="academics.html">Academics</a>
            <a href="ict.html">ICT</a>
            <a href="science.html">Science</a>
            <a href="sports.html">Sports</a>
            <a href="clubs.html">Clubs &amp; Societies</a>
            <a href="faith.html">Faith &amp; Religion</a>
            <a href="counseling.html">Guidance &amp; Counseling</a>
            <a href="agriculture.html">Agriculture</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Contact Info</h4>
          <div class="footer-links" style="gap:14px">
            <span style="color:rgba(255,255,255,.7);font-size:13.5px">📍 Off Ngong Road, Nairobi</span>
            <a href="mailto:info@kathaayoniacademy.ac.ke">✉️ info@kathaayoniacademy.ac.ke</a>
            <a href="tel:+254700000000">📞 +254 700 000 000</a>
          </div>
          <div class="footer-newsletter">
            <p style="font-size:13px;color:rgba(255,255,255,.7);margin-top:18px;margin-bottom:6px;">Subscribe to our newsletter</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button class="newsletter-btn">Go</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <div class="footer-bottom-content">
        <span>© 2024 Kathaayoni Academy Junior School. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Insert nav and footer
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;
});
