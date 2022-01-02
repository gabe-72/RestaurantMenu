function init() {
  document.getElementById("submit").addEventListener("click", sendLoginInfo);
}

/**
 * Gets the Login info
 * 
 * @returns {Object} - The user information
 */
function getLoginInfo() {
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  
  return { username: username.value, password: password.value };
}

/**
 * Sends the updated login information to the server
 * Redirects to the homepage on success
 */
async function sendLoginInfo() {
  let info = getLoginInfo();
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  });

  if (!res.ok) {
    alert("Invalid login credentials!");
    return;
  }
  location.replace("/");
}