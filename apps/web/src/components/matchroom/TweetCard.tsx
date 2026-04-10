import type { Tweet } from '../../types/tweet';

export function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <article
      className="tweet-card"
      style={{
        border: '1px solid #e1e8ed',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        color: '#14171a',
        textAlign: 'left',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 8,
        }}
      >
        {tweet.author.profilePicture?.trim()?.startsWith('http') ? (
          <img
            src={tweet.author.profilePicture}
            alt={tweet.author.name}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#1da1f2',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 600,
            }}
            aria-hidden
          >
            {tweet.author.name?.charAt(0)?.toUpperCase() || '@'}
          </div>
        )}
        <div>
          <strong style={{ display: 'block' }}>{tweet.author.name}</strong>
          <span style={{ color: '#657786', fontSize: 14 }}>
            @{tweet.author.userName}
          </span>
        </div>
      </header>
      <p
        style={{
          margin: '8px 0',
          lineHeight: 1.5,
          color: '#14171a',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {tweet.text}
      </p>
      <footer
        style={{
          color: '#657786',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 8,
        }}
      >
        <span>❤️ {tweet.likeCount}</span>
        <span>🔁 {tweet.retweetCount}</span>
        <span>💬 {tweet.replyCount}</span>
        <a
          href={tweet.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 'auto', color: '#1da1f2' }}
        >
          Ver en X →
        </a>
      </footer>
    </article>
  );
}