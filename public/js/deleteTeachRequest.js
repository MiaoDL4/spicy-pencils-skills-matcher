
const deleteTeachRequest = async (event) => {
  if (event.target.hasAttribute("teach-id")) {
    const id = event.target.getAttribute("teach-id");

    const response = await fetch(`/api/teach/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".teach-list")
  .addEventListener("click", deleteTeachRequest);