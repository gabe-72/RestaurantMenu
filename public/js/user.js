function init() {
  document.getElementById("changePrivacy").addEventListener("click", togglePrivacy);
}

/**
 * Sends a request to the server for the user details
 * 
 * @returns {Object} - The user details from the server
 */
async function reqUserInfo() {
  let user = await fetch(window.location.href, {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  return user.json();
}

/**
 * Toggles the privacy status of the user
 * by sending the updated userinfo to the server
 */
async function togglePrivacy() {
  let user = await reqUserInfo();
  console.log(user.privacy);
  user.privacy = !user.privacy;
  let response = await fetch(window.location.href, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(user)
  });
  if (response.ok) {
    window.location.reload();
  }
}