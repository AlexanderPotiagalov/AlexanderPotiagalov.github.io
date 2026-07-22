import { motion } from "framer-motion";
import { FiArrowUpRight, FiLinkedin } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const posts = [
  {
    label: "LATEST NOTE",
    src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7471971703565246465?collapsed=1",
    href: "https://www.linkedin.com/feed/update/urn:li:share:7471971703565246465",
  },
  {
    label: "BUILD LOG",
    src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7408617716426932224?collapsed=1",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7408617716426932224",
  },
  {
    label: "FIELD NOTE",
    src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7367257352355373056",
    href: "https://www.linkedin.com/feed/update/urn:li:share:7367257352355373056",
  },
];

function LinkedInPosts() {
  return (
    <section id="updates" className="linkedin-section ink-section">
      <div className="page-shell">
        <div className="section-title linkedin-title">
          <div>
            <span className="micro-label">05 / From the field</span>
            <h2><span className="linkedin-heading-dark">NOTES FROM</span><br /><em>THE BUILD.</em></h2>
          </div>
          <p>
            A few updates on my work, projects, and experience.
          </p>
        </div>

        <div className="linkedin-grid">
          {posts.map((post, index) => (
            <motion.article
              className="linkedin-card"
              key={post.href}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
            >
              <div className="linkedin-card-topline">
                <span><FiLinkedin /> {post.label}</span>
                <span>0{index + 1} / 03</span>
              </div>
              <div className="linkedin-embed">
                <iframe
                  src={post.src}
                  title={`Alexander Potiagalov LinkedIn post ${index + 1}`}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <a href={post.href} target="_blank" rel="noreferrer">
                Open on LinkedIn <FiArrowUpRight />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LinkedInPosts;
