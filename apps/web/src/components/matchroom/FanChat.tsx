import { useCallback, useEffect, useRef, useState } from "react";
import { Auth } from "../../context/AuthContext";
import {
  bootstrapMatchRoom,
  getMatchMessages,
  postMatchMessage,
  type ChatMessageRow,
} from "../../services/roomsChatService";

type FanChatProps = {
  matchId: number;
};

const POLL_MS = 2500;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function chatUserIdFromSession(user: { id: string }): string | null {
  const id = typeof user.id === "string" ? user.id.trim() : "";
  if (id && UUID_RE.test(id)) return id.toLowerCase();
  const dev = String(import.meta.env.VITE_CHAT_DEV_USER_ID || "").trim();
  if (dev && UUID_RE.test(dev)) return dev.toLowerCase();
  return null;
}

function shortUserLabel(userId: string): string {
  const s = String(userId);
  if (s.length <= 8) return s;
  return `${s.slice(0, 8)}…`;
}

function FanChat({ matchId }: FanChatProps) {
  const { session } = Auth();
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const bootstrapped = useRef(false);

  const userId = session?.user ? chatUserIdFromSession(session.user) : null;

  const refresh = useCallback(async () => {
    if (!Number.isFinite(matchId)) return;
    try {
      const { messages: rows } = await getMatchMessages(matchId);
      setMessages(rows);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar mensajes");
    }
  }, [matchId]);

  useEffect(() => {
    if (!session?.user || userId == null) {
      setReady(false);
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;

    (async () => {
      try {
        if (!bootstrapped.current) {
          await bootstrapMatchRoom(matchId, userId);
          bootstrapped.current = true;
        }
        setReady(true);
        await refresh();
        interval = setInterval(refresh, POLL_MS);
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo iniciar el chat");
        setReady(false);
      }
    })();

    return () => {
      if (interval) clearInterval(interval);
      bootstrapped.current = false;
    };
  }, [session?.user, userId, matchId, refresh]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || userId == null || !ready) return;
    setInput("");
    try {
      await postMatchMessage(matchId, userId, text);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al enviar");
    }
  }

  if (!session) {
    return (
      <div className="fan-chat">
        <h3>Fan Chat</h3>
        <p>Inicia sesión para participar en el chat de este partido.</p>
      </div>
    );
  }

  if (userId == null) {
    return (
      <div className="fan-chat">
        <h3>Fan Chat</h3>
        <p>
          No hay un identificador de usuario válido (UUID de Supabase). Cierra sesión y vuelve a
          entrar. En desarrollo puedes definir <code>VITE_CHAT_DEV_USER_ID</code> con un UUID
          válido.
        </p>
      </div>
    );
  }

  return (
    <div className="fan-chat">
      <h3>Fan Chat</h3>
      {error && <p style={{ color: "crimson", fontSize: 14 }}>{error}</p>}
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>Usuario {shortUserLabel(msg.user_id)}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button type="button" onClick={sendMessage} disabled={!ready}>
          Send
        </button>
      </div>
    </div>
  );
}

export default FanChat;