const deleteLearnRequest = async (event) => {
    if (event.target.hasAttribute("learn-id")) {
      const id = event.target.getAttribute("learn-id");
  
      const response = await fetch(`/api/learn/${id}`, {
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
  .querySelector(".learn-list")
  .addEventListener("click", deleteLearnRequest);
