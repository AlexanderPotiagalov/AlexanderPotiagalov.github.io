import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="footer-mark">AP</a>
      <p>DESIGNED + BUILT BY ALEXANDER POTIAGALOV</p>
      <p>&copy; {new Date().getFullYear()} / VANCOUVER, BC</p>
    </motion.footer>
  );
}

export default Footer;
