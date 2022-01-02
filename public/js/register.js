function init() {
  document.getElementById("submit").addEventListener("click", registerUser);
}

/**
 * Gets the User details for registration
 * 
 * @returns {Object} - Object containing user details
 */
function getUserDetails() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  
  return { username: username, password: password };
}

/**
 * Sends the details to the server for registration
 * Redirects to the new user page upon success
 */
async function registerUser() {
  let info = getUserDetails();
  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  });

  if (!res.ok) {
    alert("Invalid Details!");
    return;
  }
  window.location.replace(res.url);
}