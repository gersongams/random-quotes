import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./styles.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];

const Wrapper = styled.div`
  background: ${props => props.color};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  #quote-box {
    background: white;
    width: 60rem;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
    color: ${props => props.color};
    @media only screen and (max-width: 75em) {
      width: 75%;
      min-width: 300px;
    }
    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      svg {
        color: ${props => props.color};
        font-size: 1.6rem;
      }
    }
    & #text {
      text-align: justify;
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
    & #author {
      display: flex;
      justify-content: flex-end;
      font-weight: 300;
    }
  }
`;

const Button = styled.button`
  border: none;
  background: ${props => props.color};
  padding: 0.6rem 1rem;
  border-radius: 4px;
  color: white;
  outline: transparent;
  cursor: pointer;
`;

export default function App() {
  let [quotes, setQuotes] = useState([]);
  let [color, setColor] = useState(colors[0]);
  let [actualQuote, setActualQuote] = useState({ quote: "", author: "" });

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    console.log("initializing");
    setRandomColor();
    await fetchData();
  }

  const fetchData = async () => {
    const response = await fetch(API);
    let { quotes } = await response.json();
    const { quote, author } = getRandomQuote(quotes);
    setActualQuote({ quote, author });
    setQuotes(quotes);
  };

  const setRandomQuote = () => {
    setRandomColor();
    const { quote, author } = getRandomQuote(quotes);
    setActualQuote({ quote, author });
  };

  const getRandomQuote = quotes => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const setRandomColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setColor(color);
  };

  return (
    <Wrapper color={color}>
      <div id="quote-box">
        <div id="text">
          <span>
            <FormatQuoteIcon /> {actualQuote.quote}
          </span>
        </div>
        <div id="author">
          <span>{actualQuote.author}</span>
        </div>
        <div className="actions">
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${encodeURIComponent(
              '"' + actualQuote.quote + '" ' + actualQuote.author
            )}
              `}
            id="tweet-quote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
          <Button color={color} id="new-quote" onClick={() => setRandomQuote()}>
            New Quote
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
