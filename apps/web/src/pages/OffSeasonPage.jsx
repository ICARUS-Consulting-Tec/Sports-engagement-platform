import Navbar from "../components/layout/Navbar";
import UnityGameCard from "../components/unity/UnityGameCard";
import "../styles/unity.css";

function OffSeasonPage() {
  return (
    <div style={styles.page}>
      <main style={styles.container}>
        <Navbar />

        <section style={styles.hero}>
          <div>
            <p style={styles.eyebrow}>OFF-SEASON LAB</p>
            <h1 style={styles.title}>Unity WebGL + Joy-Con</h1>
            <p style={styles.subtitle}>
              Integracion en JavaScript usando el loader oficial de Unity y WebHID
              para mandar movimiento y botones al juego.
            </p>
          </div>
        </section>

        <UnityGameCard
          unityConfig={{
            loaderUrl: "/Build/BuildPrototipo.loader.js",
            dataUrl: "/Build/BuildPrototipo.data.br",
            frameworkUrl: "/Build/BuildPrototipo.framework.js.br",
            codeUrl: "/Build/BuildPrototipo.wasm.br",
          }}
        />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(214,40,57,0.14), transparent 28%), linear-gradient(180deg, #eef3f8 0%, #f7f9fb 100%)",
    padding: "24px",
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  hero: {
    background: "#0B2A55",
    color: "#ffffff",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "24px",
    boxShadow: "0 24px 50px rgba(11, 42, 85, 0.18)",
  },
  eyebrow: {
    margin: "0 0 8px",
    letterSpacing: "0.18em",
    fontSize: "12px",
    fontWeight: 700,
    opacity: 0.7,
  },
  title: {
    margin: "0 0 12px",
    fontSize: "42px",
    lineHeight: 1.05,
  },
  subtitle: {
    margin: 0,
    maxWidth: "760px",
    fontSize: "18px",
    lineHeight: 1.6,
    color: "rgba(255, 255, 255, 0.82)",
  },
};

export default OffSeasonPage;
