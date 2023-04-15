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
  // const [isUploading, setIsUploading] = useState(false);

  useEffect(function () {
    async function getdata() {
      setIsLoading(true);
      // ADD PAGINATION
      let { data: facts, error } = await supabase
        .from("facts")
        .select("*")
        .limit(50)
        .order("id", { ascending: false });
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
        <Categories setFacts={setFacts} />
        {isLoading ? (
          <Loader />
        ) : (
          <Factslist facts={facts} setFacts={setFacts} />
        )}

        {/* <Counter /> */}
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

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button className="but" onClick={() => setCount((c) => c + 1)}>
//         +1
//       </button>
//     </div>
//   );
// }

function Factform({ setFacts, setFormbool }) {
  const [text, setText] = useState("");
  const [Source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const lenn = 200 - text.length;

  async function handlesubmit(e) {
    e.preventDefault();
    // console.log(text, Source, category);

    if (text && Source && category && lenn <= 200) {
      // const newFact = {
      //   id: Math.round(Math.random * 10000000),
      //   text: text,
      //   source: Source,
      //   category: category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date(),
      // };

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ textt: text, source: Source, category: category }])
        .select();

      // console.log(newFact);

      if (!error) setFacts((facts) => [newFact[0], ...facts]);

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

function Categories({ setFacts }) {
  async function getdata(catname) {
    // ADD PAGINATION
    let { data: facts, error } = await supabase
      .from("facts")
      .select("*")
      .eq("category", catname)
      .limit(50);
    // console.log("here");

    if (!error) setFacts(facts);
    else alert("there was a problem in retrieving the data");
  }

  async function getalldata() {
    // ADD PAGINATION
    let { data: facts, error } = await supabase
      .from("facts")
      .select("*")
      .limit(50);
    // console.log("here");

    if (!error) setFacts(facts);
    else alert("there was a problem in retrieving the data");
  }

  return (
    <ul className="but-lst">
      {" "}
      <li>
        <button onClick={() => getalldata()} className="but">
          All
        </button>
      </li>
      {CATEGORIES.map((cat) => (
        <li key={cat.name}>
          <button
            className="but"
            onClick={() => getdata(cat.name)}
            style={{ backgroundColor: cat.color, color: "white" }}
          >
            {cat.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Factslist({ facts, setFacts }) {
  return (
    <ul className="fact-list">
      {facts.map((fact) => (
        <Fact key={fact.id} fact={fact} setFacts={setFacts} />
      ))}
    </ul>
  );
}

function Fact({ fact, setFacts }) {
  // const [disvotes, setDisvotes] = useState(false);
  async function handlevotes(vote) {
    const { data: updatedvotes, error } = await supabase
      .from("facts")
      .update({ [vote]: fact[vote] + 1 })
      .eq("id", fact.id)
      .select();

    // console.log(updatedvotes[0]);
    if (!error) {
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedvotes[0] : f))
      );
    }
  }
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
        <button onClick={() => handlevotes("upvotes")}>
          <strong>👍</strong>
          {fact.upvotes}
        </button>
        <button onClick={() => handlevotes("mehvotes")}>
          <strong>😑</strong>
          {fact.mehvotes}
        </button>
        <button onClick={() => handlevotes("downvotes")}>
          <strong>👎</strong>
          {fact.downvotes}
        </button>
      </div>
    </li>
  );
}

export default App;
