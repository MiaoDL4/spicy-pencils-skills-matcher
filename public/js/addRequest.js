const addLearnForm = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#learn-name").value.trim();
  const level = document.querySelector("#learn-level").value.trim();
  const description = document.querySelector("#learn-desc").value.trim();

  if (name && level && description) {
    const response = await fetch(`/api/learn`, {
      method: "POST",
      body: JSON.stringify({ name, level, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create project");
    }
  }
};

const addTeachForm = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#teach-name").value.trim();
  const level = document.querySelector("#teach-level").value.trim();
  const description = document.querySelector("#teach-desc").value.trim();

  if (name && level && description) {
    const response = await fetch(`/api/teach`, {
      method: "POST",
      body: JSON.stringify({ name, level, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create project");
    }
  }
};

document
  .querySelector(".learn-project-form")
  .addEventListener("submit", addLearnForm);

document
  .querySelector(".teach-project-form")
  .addEventListener("submit", addTeachForm);
