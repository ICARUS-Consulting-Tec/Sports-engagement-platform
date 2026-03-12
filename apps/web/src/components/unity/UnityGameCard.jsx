import UnityGameEmbed from "./UnityGameEmbed";

function UnityGameCard({ unityConfig }) {
  return (
    <section className="unity-game-card">
      <header className="unity-game-card-header">
        <p className="unity-game-card-kicker">UNITY WEBGL</p>
        <h2 className="unity-game-card-title">Off-Season Challenge</h2>
        <p className="unity-game-card-copy">
          Juego embebido con puente JavaScript para Joy-Con por WebHID.
        </p>
      </header>

      <UnityGameEmbed {...unityConfig} />
    </section>
  );
}

export default UnityGameCard;
