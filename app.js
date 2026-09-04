
// ==========================================
// DATA
// ==========================================

let topics = [
  {
    id: 1,
    name: "JavaScript",
    completed: true
  },
  {
    id: 2,
    name: "React",
    completed: true
  },
  {
    id: 3,
    name: "Node.js",
    completed: false
  }
];


// ==========================================
// FUNCTION DECLARATION
// ==========================================

function addTopic(name) {

  const newTopic = {
    id: Date.now(),
    name: name,
    completed: false
  };

  // IMMUTABILITY
  // New array create kar rahe hain
  topics = [...topics, newTopic];

  renderTopics();
}


// ==========================================
// FUNCTION EXPRESSION
// ==========================================

const getCompletedCount = function () {

  // FILTER METHOD
  const completedTopics = topics.filter(function (topic) {
    return topic.completed === true;
  });

  return completedTopics.length;
};


// ==========================================
// ARROW FUNCTION
// ==========================================

const toggleTopic = (id) => {

  // MAP METHOD
  topics = topics.map((topic) => {

    if (topic.id === id) {

      // IMMUTABILITY
      // New object return kar rahe hain
      return {
        ...topic,
        completed: !topic.completed
      };
    }

    return topic;
  });

  renderTopics();
};


// ==========================================
// DELETE TOPIC
// ==========================================

const deleteTopic = (id) => {

  // FILTER METHOD
  // Selected id ko remove karke new array return hoga
  topics = topics.filter((topic) => {
    return topic.id !== id;
  });

  renderTopics();
};


// ==========================================
// RENDER TOPICS
// ==========================================

function renderTopics() {

  const list = document.getElementById("topicList");

  // Purani UI clear
  list.innerHTML = "";


  // MAP METHOD
  topics.map((topic) => {

    const li = document.createElement("li");

    // Complete / Incomplete Button
    const topicButton = document.createElement("button");

    topicButton.textContent =
      `${topic.completed ? "✅" : "⬜"} ${topic.name}`;


    // ARROW FUNCTION
    topicButton.addEventListener("click", () => {

      toggleTopic(topic.id);

    });


    // Delete Button
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";


    // ARROW FUNCTION
    deleteButton.addEventListener("click", () => {

      deleteTopic(topic.id);

    });


    li.appendChild(topicButton);
    li.appendChild(deleteButton);

    list.appendChild(li);

  });


  renderStats();
}


// ==========================================
// LEXICAL SCOPE
// ==========================================

function renderStats() {

  const completed = getCompletedCount();
  const total = topics.length;


  // INNER FUNCTION
  function showStats() {

    // completed aur total showStats ke andar
    // define nahi hain.
    //
    // Lekin ye outer function renderStats()
    // ke variables ko access kar sakta hai.
    //
    // YE HAI LEXICAL SCOPE

    console.log("Completed:", completed);
    console.log("Total:", total);
  }


  showStats();


  const stats = document.getElementById("stats");

  document.getElementById("totalTopics").textContent = total;
  document.getElementById("completedTopics").textContent = completed;
  document.getElementById("progress").textContent =
    `${total === 0 ? 0 : Math.round((completed / total) * 100)}%`;
}


// ==========================================
// EVENT LISTENER
// FUNCTION EXPRESSION
// ==========================================

const addBtn = document.getElementById("addBtn");


addBtn.addEventListener("click", function () {

  const input = document.getElementById("topicInput");

  const topicName = input.value.trim();


  if (topicName === "") {

    alert("Please enter a topic");

    return;
  }


  addTopic(topicName);


  // Input empty
  input.value = "";
});


// ==========================================
// INITIAL RENDER
// ==========================================

renderTopics();


// ==========================================
// HOISTING PRACTICE
// ==========================================

/*

1. FUNCTION DECLARATION

sayHello();

function sayHello() {
  console.log("Hello");
}

✅ Ye chalega because Function Declaration hoisted hoti hai.


--------------------------------------------


2. FUNCTION EXPRESSION

sayHello();

const sayHello = function () {
  console.log("Hello");
};

❌ Error
Cannot access 'sayHello' before initialization


--------------------------------------------


3. ARROW FUNCTION

sayHello();

const sayHello = () => {
  console.log("Hello");
};

❌ Error
Cannot access 'sayHello' before initialization

*/
