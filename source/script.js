console.log("hahah triai");

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

const btn = document.querySelector(".sharefact");
const form = document.querySelector(".fact-form");
const factlist = document.querySelector(".fact-list");

factlist.innerHTML = "";

// Load dataa from supabase
loadfacts();

async function loadfacts() {
  const res = await fetch(
    "https://yoelrkppsapyahcvgxjm.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZWxya3Bwc2FweWFoY3ZneGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjI0MDUsImV4cCI6MTk5NjYzODQwNX0.DURvskU7F68MfHEVpvb3FgIIXZse9R0RyDUUfY_vKh0",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZWxya3Bwc2FweWFoY3ZneGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjI0MDUsImV4cCI6MTk5NjYzODQwNX0.DURvskU7F68MfHEVpvb3FgIIXZse9R0RyDUUfY_vKh0",
      },
    }
  );

  const data = await res.json();
  console.log(data);

  createFactsList(data);
}

// factlist.insertAdjacentHTML("afterbegin", "testingone");
// createFactsList(initialFacts);

function createFactsList(dataarray) {
  const htmlArr = dataarray.map(function (fact) {
    return `<li class="fact">
          <p>
            ${fact.textt}
            <a class="source" href=${fact.source}>(Source)</a>
            <span class="tag">${fact.category}</span>
          </p>
          <div class="votes">
            <button><strong>👍</strong>${fact.upvotes}</button>
            <button><strong>😑</strong>${fact.mehvotes}</button>
            <button><strong>👎</strong>${fact.downvotes}</button>
          </div>
        </li>`;
  });

  const html = htmlArr.join("");
  factlist.insertAdjacentHTML("afterbegin", html);
}

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

[1, 2, 3, 4].forEach(function (aa) {
  console.log(aa);
});
