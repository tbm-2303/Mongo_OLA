import { useEffect, useState } from 'react';

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [newTweetText, setNewTweetText] = useState('');

  const fetchTweets = async () => {
    const res = await fetch('/api/tweets');
    const data = await res.json();
    setTweets(data);
  };

  const submitTweet = async () => {
    const tweet = {
      user: { id: Date.now() }, // just a random unique user ID for this example
      text: newTweetText,
      created_at: new Date().toISOString()
    };

    const res = await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tweet),
    });

    if (res.ok) {
      alert('Tweet submitted!');
      setNewTweetText('');
      fetchTweets(); // Refresh tweets list
    } else {
      alert('Failed to submit tweet');
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>MongoDB Tweet Viewer</h1>

      <button onClick={fetchTweets} style={{ marginBottom: '1rem' }}>
        Load Tweets
      </button>

      <ul>
        {tweets.map((tweet, index) => (
          <li key={index}>
            <strong>User ID:</strong> {tweet.user?.id} <br />
            <strong>Text:</strong> {tweet.text}
          </li>
        ))}
      </ul>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Submit a New Tweet</h2>
      <input
        type="text"
        value={newTweetText}
        onChange={(e) => setNewTweetText(e.target.value)}
        placeholder="Write a tweet..."
        style={{ marginRight: '1rem', padding: '0.5rem', width: '300px' }}
      />
      <button onClick={submitTweet}>Submit Tweet</button>
    </div>
  );
}
