import { useState, useEffect } from 'react'
import axios from 'axios';
import classes from '../modules/index.module.scss'

function App() {
  const [quoteId, setQuoteId] = useState(null);
  const [quote, setQuote] = useState('')

  const randomQuotes = () => {
      axios.get('https://api.adviceslip.com/advice')
        .then(response => {
          const {id, advice} = response.data.slip;
          setQuoteId(id);
          setQuote(advice);
        })
        .catch(error => {
          console.error(error)
        });
  };

  useEffect(() => {
    randomQuotes();
  });

  return (
    <>
      <div className={classes['container']}>
        <div className={classes['box']}>
        {quoteId !== null ? (
            <>
              <p className={classes['quote-id']}>Advice #{quoteId}</p>
              <p className={classes['quote-text']}>{quote}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={randomQuotes}>Random</button>
        </div>
      </div>
    </>
  )
}

export default App
