// SWE-Review Main Results Data and Interactivity

const leaderboardData = {
  glm5: [
    { model: "Claude Opus 4.6", cr: 100.0, da: 75.6, rrr: 75.2, delta: "+3.0", trained: false },
    { model: "GLM-5", cr: 98.9, da: 69.9, rrr: 75.0, delta: "+2.8", trained: false },
    { model: "SWE-Review-30B-A3B", cr: 82.0, da: 69.0, rrr: 72.6, delta: "+0.4", trained: true },
    { model: "SWE-Review-8B", cr: 84.2, da: 68.7, rrr: 71.6, delta: "-0.6", trained: true },
    { model: "Qwen3-30B-A3B", cr: 84.2, da: 63.2, rrr: 64.9, delta: "-7.3", trained: false },
    { model: "Qwen3-8B", cr: 4.1, da: 49.0, rrr: 72.2, delta: "0.0", trained: false },
    { model: "No Review", cr: null, da: null, rrr: 72.2, delta: "\u2014", trained: false },
  ],
  coder30b: [
    { model: "Claude Opus 4.6", cr: 100.0, da: 80.5, rrr: 67.3, delta: "+16.4", trained: false },
    { model: "GLM-5", cr: 97.3, da: 75.7, rrr: 60.0, delta: "+9.1", trained: false },
    { model: "SWE-Review-30B-A3B", cr: 83.1, da: 70.5, rrr: 53.7, delta: "+2.8", trained: true },
    { model: "SWE-Review-8B", cr: 81.4, da: 66.9, rrr: 52.8, delta: "+1.9", trained: true },
    { model: "Qwen3-30B-A3B", cr: 76.0, da: 54.5, rrr: 49.1, delta: "-1.8", trained: false },
    { model: "Qwen3-8B", cr: 3.6, da: 49.1, rrr: 50.9, delta: "0.0", trained: false },
    { model: "No Review", cr: null, da: null, rrr: 50.9, delta: "\u2014", trained: false },
  ],
  instruct30b: [
    { model: "Claude Opus 4.6", cr: 100.0, da: 89.4, rrr: 52.6, delta: "+25.1", trained: false },
    { model: "GLM-5", cr: 97.4, da: 86.3, rrr: 47.5, delta: "+20.0", trained: false },
    { model: "SWE-Review-30B-A3B", cr: 87.2, da: 76.5, rrr: 35.8, delta: "+8.3", trained: true },
    { model: "SWE-Review-8B", cr: 71.1, da: 71.6, rrr: 35.1, delta: "+7.6", trained: true },
    { model: "Qwen3-30B-A3B", cr: 76.3, da: 45.9, rrr: 28.2, delta: "+0.7", trained: false },
    { model: "Qwen3-8B", cr: 3.7, da: 50.8, rrr: 27.5, delta: "0.0", trained: false },
    { model: "No Review", cr: null, da: null, rrr: 27.5, delta: "\u2014", trained: false },
  ]
};

let currentSplit = "glm5";
let currentSort = { col: "da", dir: "desc" };

function renderTable() {
  const data = [...leaderboardData[currentSplit]];

  if (currentSort.col) {
    data.sort((a, b) => {
      let va = a[currentSort.col];
      let vb = b[currentSort.col];
      if (currentSort.col === "delta") {
        va = parseFloat(va) || 0;
        vb = parseFloat(vb) || 0;
      }
      if (va === null) return 1;
      if (vb === null) return -1;
      return currentSort.dir === "desc" ? vb - va : va - vb;
    });
  }

  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = data.map((row) => {
    const crDisplay = row.cr !== null ? row.cr.toFixed(1) : "\u2014";
    const daDisplay = row.da !== null ? row.da.toFixed(1) : "\u2014";
    const rrrDisplay = row.rrr.toFixed(1);
    const deltaClass = row.delta.startsWith("+") ? "has-text-success" : row.delta.startsWith("-") ? "has-text-danger" : "";
    const rowClass = row.trained ? ' class="trained-row"' : '';
    return `<tr${rowClass}>
      <td><strong>${row.model}</strong></td>
      <td>${crDisplay}</td>
      <td>${daDisplay}</td>
      <td>${rrrDisplay}</td>
      <td class="${deltaClass}">${row.delta}</td>
    </tr>`;
  }).join("");

  document.querySelectorAll("th.sortable").forEach(th => {
    th.classList.remove("sort-asc", "sort-desc");
    if (th.dataset.col === currentSort.col) {
      th.classList.add(currentSort.dir === "desc" ? "sort-desc" : "sort-asc");
    }
  });
}

// Tab switching
document.querySelectorAll("#leaderboard-tabs li").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#leaderboard-tabs li").forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    currentSplit = tab.dataset.split;
    renderTable();
  });
});

// Column sorting
document.querySelectorAll("th.sortable").forEach(th => {
  th.addEventListener("click", () => {
    const col = th.dataset.col;
    if (currentSort.col === col) {
      currentSort.dir = currentSort.dir === "desc" ? "asc" : "desc";
    } else {
      currentSort = { col, dir: "desc" };
    }
    renderTable();
  });
});

// Scroll-triggered fade-in animations
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  initScrollAnimations();
});
