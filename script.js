let totalJobsCount = document.getElementsByClassName("total");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let selectedJob = document.getElementById("selectedJob");

// -----------------------------

const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("rejected-container");
const allJobs = document.getElementById("job-container");

// ------------------------------------
const interviewList = [];
const rejectedList = [];
// -----------------------

const jobs = [
  {
    id: "j1",
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions.",
    status: "none",
  },
  {
    id: "j2",
    companyName: "Nexa Labs",
    position: "Frontend Developer",
    location: "Dubai",
    type: "Hybrid",
    salary: "$60,000 - $85,000",
    description:
      "Work with modern UI stack, build reusable components, and improve web performance.",
    status: "none",
  },
  {
    id: "j3",
    companyName: "BlueOrbit",
    position: "Junior JS Developer",
    location: "Remote",
    type: "Internship",
    salary: "$1,200/mo",
    description:
      "Assist in building features, fixing bugs, and writing clean JavaScript code with mentoring.",
    status: "none",
  },
  {
    id: "j4",
    companyName: "DesertTech",
    position: "Node.js Backend Developer",
    location: "Abu Dhabi",
    type: "On-site",
    salary: "$75,000 - $100,000",
    description:
      "Build APIs with Node/Express, integrate MongoDB, and implement authentication + logging.",
    status: "none",
  },
  {
    id: "j5",
    companyName: "CloudNine",
    position: "Full Stack Developer",
    location: "Remote",
    type: "Contract",
    salary: "$45/hr",
    description:
      "Deliver features across UI + API. Collaborate with designers and ship fast iterations.",
    status: "none",
  },
  {
    id: "j6",
    companyName: "Palm Studios",
    position: "UI Developer",
    location: "Sharjah",
    type: "On-site",
    salary: "$55,000 - $70,000",
    description:
      "Turn Figma into responsive layouts. Strong CSS and accessibility focus preferred.",
    status: "none",
  },
  {
    id: "j7",
    companyName: "FinSpark",
    position: "React Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description:
      "Build dashboards, charts, and forms. Work with REST APIs and state management.",
    status: "none",
  },
  {
    id: "j8",
    companyName: "ByteBridge",
    position: "Software Engineer",
    location: "Dubai",
    type: "Hybrid",
    salary: "$100,000 - $140,000",
    description:
      "Own features end-to-end, write tests, and collaborate with product + design teams.",
    status: "none",
  },
];
// Rendering all jobs----------------------------------

allJobs.innerHTML = "";
jobs.forEach((job) => {
  const div = document.createElement("div");
  div.innerHTML = `
          <div class="job-card" id='${job.id}'>
          <div class="first-div">
            <div>
              <h2 class="job-title">${job.companyName}</h2>
              <h3 class="job-tech">${job.position}</h3>
            </div>

            <button class="delete">
              <img src="delete.svg" alt="Delete" srcset="" class="deleted"/>
            </button>
          </div>
          <div class="job-type">
            <p>${job.location} : ${job.type} : ${job.salary}</p>
          </div>
          <button class="btn job-status">NOT APPLIED</button>
          <div class="job-describtion">
            ${job.description}
          </div>

          <button class="btn interview">INTERVIEW</button
          ><button class="btn rejected">REJECTED</button>
        </div>
  `;

  allJobs.appendChild(div);
});
// ------------------------------

const all = document.getElementById("all");
const interview = document.getElementById("interview");
const rejected = document.getElementById("rejected");

all.addEventListener("click", () => {
  interviewContainer.classList.add("hide");
  rejectedContainer.classList.add("hide");
  allJobs.classList.remove("hide");

  interview.classList.remove("active");
  rejected.classList.remove("active");
  all.classList.add("active");

  selectedJob.innerText = "";
});
interview.addEventListener("click", () => {
  allJobs.classList.add("hide");
  rejectedContainer.classList.add("hide");
  interviewContainer.classList.remove("hide");

  all.classList.remove("active");
  rejected.classList.remove("active");
  interview.classList.add("active");

  selectedJob.innerText = `${interviewList.length} of `;
});
rejected.addEventListener("click", () => {
  allJobs.classList.add("hide");
  interviewContainer.classList.add("hide");
  rejectedContainer.classList.remove("hide");

  interview.classList.remove("active");
  all.classList.remove("active");
  rejected.classList.add("active");

  selectedJob.innerText = `${rejectedList.length} of `;
});

// Job counter--------------
function getJobsCount(a) {
  for (let count of totalJobsCount) {
    count.innerText = allJobs.children.length - a;
  }
}

// click handler ------------------------
let count = 0;
function clickHandler(e) {
  const btn = e.target.closest(".interview, .rejected, .delete");
  if (!btn) return;

  const card = e.target.closest(".job-card");

  if (e.target.classList.contains("interview")) {
    addInterview(card);
    card.classList.remove("interview-rejected");
    card.classList.add("interview-selected");
    let status = card.querySelector(".job-status");
    status.innerText = "INTERVIEW";
    status.classList.remove("rejected-status");
    status.classList.add("interview-status");

    getInterview();
    getRejected();
    return;
  }
  if (e.target.classList.contains("rejected")) {
    addReject(card);
    card.classList.remove("interview-selected");
    card.classList.add("interview-rejected");
    let status = card.querySelector(".job-status");
    status.innerText = "REJECTED";

    status.classList.remove("interview-status");
    status.classList.add("rejected-status");

    getInterview();
    getRejected();
    return;
  }

  if (e.target.classList.contains("deleted")) {
    // delete from list--------------
    for (let i of rejectedList) {
      if (i.id == card.id) {
        const index = rejectedList.findIndex((i) => i.id == card.id);
        console.log("index", index);
        if (index !== -1) {
          rejectedList.splice(index, 1);
        }
      }
    }

    for (let i of interviewList) {
      if (i.id == card.id) {
        const index = interviewList.findIndex((i) => i.id == card.id);
        if (index !== -1) {
          interviewList.splice(index, 1);
        }
      }
    }
    // ------------
    card.remove();
    getInterview();
    getRejected();
    count = count + 1;
    getJobsCount(count);
    return;
  }
}

allJobs.addEventListener("click", clickHandler);
interviewContainer.addEventListener("click", clickHandler);
rejectedContainer.addEventListener("click", clickHandler);

// add interview ================
function addInterview(card) {
  if (interviewList.length > 0) {
    for (let item of interviewList) {
      if (item.id == card.id) {
        return;
      }
    }
  }
  for (let i of rejectedList) {
    if (i.id == card.id) {
      const index = rejectedList.findIndex((i) => i.id == card.id);
      console.log("index", index);
      if (index !== -1) {
        rejectedList.splice(index, 1);
      }
    }
  }
  const id = card.id;
  const companyName = card.querySelector(".job-title").innerText;
  const position = card.querySelector(".job-tech").innerText;
  const location = card.querySelector(".job-type").innerText;
  const description = card.querySelector(".job-describtion").innerText;

  const info = {
    id,
    companyName,
    position,
    location,
    description,
  };
  interviewList.push(info);
}
// add reject list================
function addReject(card) {
  if (rejectedList.length > 0) {
    for (let item of rejectedList) {
      if (item.id == card.id) {
        return;
      }
    }
  }
  for (let i of interviewList) {
    if (i.id == card.id) {
      const index = interviewList.findIndex((i) => i.id == card.id);
      if (index !== -1) {
        interviewList.splice(index, 1);
      }
    }
  }
  const id = card.id;
  const companyName = card.querySelector(".job-title").innerText;
  const position = card.querySelector(".job-tech").innerText;
  const location = card.querySelector(".job-type").innerText;
  const description = card.querySelector(".job-describtion").innerText;

  const info = {
    id,
    companyName,
    position,
    location,
    description,
  };
  rejectedList.push(info);
}

// -----------------------------
function getInterview() {
  // interview Rendering -----------------------
  interviewContainer.innerHTML = "";
  interviewList.forEach((interview) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="job-card" id='${interview.id}'>
          <div class="first-div">
            <div>
              <h2 class="job-title">${interview.companyName}</h2>
              <h3 class="job-tech">${interview.position}</h3>
            </div>

            <button class="delete">
              <img src="delete.svg" alt="Delete" srcset="" class="deleted"/>
            </button>
          </div>
          <div class="job-type">
            <p>${interview.location}</p>
          </div>
          <button class="btn job-status interview-status" >INTERVIEW</button>
          <div class="job-describtion">
            ${interview.description}
          </div>

          <button class="btn interview">INTERVIEW</button
          ><button class="btn rejected">REJECTED</button>
        </div>
  `;

    interviewContainer.appendChild(div);
  });

  interviewCount.innerText = interviewList.length;

  if (interviewList.length < 1) {
    interviewContainer.innerHTML = `
    <div class="empty">
          <img src="jobs.png" alt="" srcset="" />
          <h2>No jobs available</h2>
          <p>Check back soon for new job opportunities</p>
        </div>
    `;
  }
}

// --------------------------------

function getRejected() {
  // reject Rendering -----------------------
  rejectedContainer.innerHTML = "";
  rejectedList.forEach((interview) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="job-card" id='${interview.id}'>
          <div class="first-div">
            <div>
              <h2 class="job-title">${interview.companyName}</h2>
              <h3 class="job-tech">${interview.position}</h3>
            </div>

            <button class="delete">
              <img src="delete.svg" alt="Delete" srcset="" class="deleted"/>
            </button>
          </div>
          <div class="job-type">
            <p>${interview.location}</p>
          </div>
          <button class="btn job-status rejected-status" >REJECTED</button>
          <div class="job-describtion">
            ${interview.description}
          </div>

          <button class="btn interview">INTERVIEW</button
          ><button class="btn rejected">REJECTED</button>
        </div>
  `;

    rejectedContainer.appendChild(div);
  });
  rejectedCount.innerText = rejectedList.length;

  if (rejectedList.length < 1) {
    rejectedContainer.innerHTML = `
    <div class="empty">
          <img src="jobs.png" alt="" srcset="" />
          <h2>No jobs available</h2>
          <p>Check back soon for new job opportunities</p>
        </div>
    `;
  }
}

// ---------------------------------------
