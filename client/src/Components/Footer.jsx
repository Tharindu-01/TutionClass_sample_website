
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {currentYear} NextGen Education Academy.
        All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
