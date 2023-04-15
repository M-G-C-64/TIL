import { useEffect, useState } from "react";
import supabase from "./supabase.js";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [formbool, setFormbool] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getdata() {
      setIsLoading(true);
      // ADD PAGINATION
      let { data: facts, error } = await supabase
        .from("facts")
        .select("*")
        .limit(50);
      // console.log(facts);

      if (!error) setFacts(facts);
      else alert("there was a problem in retrieving the data");

      setIsLoading(false);
    }
    getdata();
  }, []);

  return (
    <>
      <Header setFormbool={setFormbool} formbool={formbool} />
      {formbool ? (
        <Factform setFacts={setFacts} setFormbool={setFormbool} />
      ) : null}
      <main className="main">
        <Categories />
        {isLoading ? <Loader /> : <Factslist facts={facts} />}

        <Counter />
      </main>
    </>
  );
}

function Loader() {
  return <p>Loading...</p>;
}

function Header({ setFormbool, formbool }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="/message-icon.webp" alt="img" width="68" height="68" />
        <h1>Today I Learned</h1>
      </div>
      <button className="but sharefact" onClick={() => setFormbool((s) => !s)}>
        {formbool ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button className="but" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

function Factform({ setFacts, setFormbool }) {
  const [text, setText] = useState("");
  const [Source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const lenn = 200 - text.length;

  function handlesubmit(e) {
    e.preventDefault();
    // console.log(text, Source, category);

    if (text && Source && category && lenn <= 200) {
      const newFact = {
        id: Math.round(Math.random * 10000000),
        text: text,
        source: Source,
        category: category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date(),
      };
      console.log(newFact.text, newFact.createdIn);
      setFacts((facts) => [newFact, ...facts]);
      setText("");
      setCategory("");
      setSource("");

      setFormbool(false);
    }
  }

  return (
    <form action="" className="fact-form" onSubmit={handlesubmit}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Share a fact"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <span>{lenn}</span>
      <input
        type="text"
        name=""
        id=""
        placeholder="Back it up with a source"
        value={Source}
        onChange={(e) => {
          setSource(e.target.value);
        }}
      />
      <select
        name=""
        id=""
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">Choose Category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="but" style={{ minWidth: "120px" }}>
        Post
      </button>
    </form>
  );
}

function Categories() {
  return (
    <ul className="but-lst">
      {CATEGORIES.map((cat) => (
        <li key={cat.name}>
          <button
            className="but"
            style={{ backgroundColor: cat.color, color: "white" }}
          >
            {cat.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Factslist({ facts }) {
  return (
    <ul className="fact-list">
      {facts.map((fact) => (
        <Fact key={fact.id} fact={fact} />
      ))}
    </ul>
  );
}

function Fact({ fact }) {
  // console.log(fact);
  return (
    <li className="fact">
      <p>
        {fact.textt}
        <a className="source" href={fact.source}>
          (Source)
        </a>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === fact.category
            ).color,
          }}
        >
          {fact.category}
        </span>
      </p>
      <div className="votes">
        <button>
          <strong>👍</strong>
          {fact.upvotes}
        </button>
        <button>
          <strong>😑</strong>
          {fact.mehvotes}
        </button>
        <button>
          <strong>👎</strong>
          {fact.downvotes}
        </button>
      </div>
    </li>
  );
}

export default App;
