import { NavLink } from "react-router-dom";

function Navbar() {
  function getLinkStyle({ isActive }) {
    return {
      ...styles.link,
      ...(isActive ? styles.activeLink : {}),
    };
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <div style={styles.logoCircle}>TC</div>
        <h2 style={styles.brand}>TITANS CREW</h2>

        <div style={styles.links}>
          <NavLink to="/" style={getLinkStyle}>Home</NavLink>
          <NavLink to="/matches" style={getLinkStyle}>Matches</NavLink>
          <NavLink to="/team" style={getLinkStyle}>Team</NavLink>
          <NavLink to="/community" style={getLinkStyle}>Community</NavLink>
          <NavLink to="/history" style={getLinkStyle}>History</NavLink>
          <NavLink to="/store" style={getLinkStyle}>Store</NavLink>
          <NavLink to="/news" style={getLinkStyle}>News</NavLink>
        </div>
      </div>

      <button style={styles.loginButton}>Login / Sign Up</button>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px 16px 0 0",
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },
  logoCircle: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#0B2A55",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    border: "2px solid #d62839",
  },
  brand: {
    color: "#0B2A55",
    fontSize: "28px",
    marginRight: "20px",
  },
  links: {
    display: "flex",
    gap: "18px",
    color: "#374151",
    fontSize: "16px",
    flexWrap: "wrap",
  },
  link: {
    color: "#374151",
    textDecoration: "none",
    fontWeight: 500,
  },
  activeLink: {
    fontWeight: "bold",
    color: "#0B2A55",
  },
  loginButton: {
    backgroundColor: "#0B2A55",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default Navbar;
