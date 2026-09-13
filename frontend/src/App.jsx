import { useState } from 'react';
import harryPotter from './images/harry-potter.jpg';
import faultInOurStars from './images/the-fault-in-our-stars.jpg';
import whereSheWent from './images/where-she-went.jpeg';
import whereYouGo from './images/where-you-go.png';

const recommendations = [
  { title: 'Harry Potter', author: 'J.K. Rowling', match: 90, tags: ['magic', 'adventure'], why: 'Fits your pace for series-length reads', image: harryPotter },
  { title: 'The Fault in Our Stars', author: 'John Green', match: 86, tags: ['grief', 'coming-of-age'], why: 'Strong emotional arc, shorter length', image: faultInOurStars },
  { title: 'Where She Went', author: 'Gayle Forman', match: 82, tags: ['loss', 'music'], why: 'Similar emotional tone to your recent reads', image: whereSheWent },
  { title: "Where'd You Go, Bernadette", author: 'Maria Semple', match: 78, tags: ['witty', 'family'], why: 'A lighter, faster-paced pick', image: whereYouGo },
];

const progress = [
  { title: 'Circe', author: 'Madeline Miller', started: 'Aug 14', percent: 52, pages: '210 of 400 pages', cover: 'https://covers.openlibrary.org/b/isbn/9780316556347-M.jpg' },
  { title: 'Project Hail Mary', author: 'Andy Weir', started: 'Aug 28', percent: 13, pages: '64 of 476 pages', cover: 'https://covers.openlibrary.org/b/isbn/9780593395561-M.jpg' },
];

function App() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { type: 'assistant', text: 'Hi! Tell me what you are in the mood for, or paste a passage from Circe you want to reflect on.' },
  ]);
  const [input, setInput] = useState('');
  const filteredRecommendations = recommendations.filter((book) =>
    `${book.title} ${book.author} ${book.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()),
  );

  function askAbout(book) {
    setInput(`Tell me more about ${book.title} by ${book.author}.`);
  }

  function sendMessage(event) {
    event?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((current) => [
      ...current,
      { type: 'user', text },
      { type: 'assistant', text: "Noted. I will factor that into your next picks and surface matching passages as you read." },
    ]);
    setInput('');
  }

  return (
    <>
      <header>
        <div className="brand">
          <div className="mark"><span aria-hidden="true">☰</span></div>
          <h1>Book Assistant</h1>
        </div>
        <div className="status"><span className="dot" /> React app · Local mode</div>
      </header>

      <main className="app">
        <div className="left-col">
          <div className="search-wrap">
            <div className="search-bar">
              <span aria-hidden="true">⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your library, or find a book to add…" />
              <button className="search-btn" type="button">Search</button>
            </div>
          </div>

          <section>
            <div className="section-head"><h2>Continue reading</h2><span>NLP progress tracking</span></div>
            <div className="progress-grid">
              {progress.map((book) => (
                <article className="progress-card" key={book.title}>
                  <div className="cover-mini"><img src={book.cover} alt={`${book.title} cover`} /></div>
                  <div className="progress-body">
                    <h3>{book.title}</h3>
                    <div className="meta">{book.author} · started {book.started}</div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: `${book.percent}%` }} /></div>
                    <div className="est">{book.pages} · keep reading at your pace</div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="stat-grid">
              <div className="stat-card"><div className="label">🎯 Adaptive daily goal</div><div className="num">32 <small>/ 40 pages</small></div><div className="sub green">80% on track</div></div>
              <div className="stat-card"><div className="label">🔥 Streak &amp; velocity</div><div className="num">12 <small>days</small></div><div className="sub muted">avg. 34 pages / session</div></div>
              <div className="stat-card"><div className="label">📚 Books completed</div><div className="num">2 <small>finished</small></div><div className="sub amber">rated 4.5★ avg</div></div>
            </div>
          </section>

          <section>
            <div className="section-head"><h2>Recommended for you</h2><span>Myth &amp; literary fantasy · {filteredRecommendations.length} matches</span></div>
            <div className="rec-grid">
              {filteredRecommendations.map((book) => (
                <article className="rec-card" key={book.title}>
                  <div className="rec-cover"><img src={book.image} alt={`${book.title} cover`} /></div>
                  <h3>{book.title}</h3><div className="author">{book.author}</div><div className="match">{book.match}% match</div>
                  <div className="tag-row">{book.tags.map((tag, index) => <span className={`tag ${index ? 'indigo' : 'amber'}`} key={tag}>#{tag}</span>)}</div>
                  <div className="why">{book.why}</div>
                  <button className="ask-btn" type="button" onClick={() => askAbout(book)}>Ask Assistant about this</button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="chat-col">
          <div className="chat-panel">
            <div className="chat-head"><h2>✏️ Ask the Assistant</h2><p>Get picks, or talk through what you are reading</p></div>
            <div className="chat-thread" id="thread">
              {messages.map((message, index) => <div className={`bubble ${message.type}`} key={`${message.type}-${index}`}>{message.text}</div>)}
            </div>
            <form className="chat-input-row" onSubmit={sendMessage}>
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type your reading preferences…" aria-label="Message" />
              <button className="send-btn" type="submit" aria-label="Send">➤</button>
            </form>
          </div>
        </aside>
      </main>
    </>
  );
}

export default App;
