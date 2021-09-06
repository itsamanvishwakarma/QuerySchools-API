var form = document.getElementById("token-form");
form.addEventListener("submit", tokenRequest);
async function tokenRequest(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const response = await fetch("/api/token/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => res.json());
  // check for status code
  if (response.status !== "error") {
    document.getElementById(
      "after-token-result"
    ).innerHTML = `<div class="card">
          <div class="card-header">
            <h3 class="card-title">Token Generated</h3>
          </div>
          <div class="card-body">
            <p class="card-text">
              <span id="user-email"></span>
              <span id="token"></span>
              <span id="limit"></span>
              <span id="dailyexp"></span>
              <span id="exp"></span>
            </p>
          </div>
      </div>`;
    // clear elements inside errs id div
    document.getElementById("errs").innerHTML = "";
    document.getElementById("user-email").innerHTML =
      "<b>Email:</b> " + response.data.email;
    document.getElementById("token").innerHTML =
      "<b>Token:</b> " + response.data.token;
    document.getElementById("limit").innerHTML =
      "<b>Limit Of The Day:</b> " + response.data.dailyLimit;
    document.getElementById("dailyexp").innerHTML =
      "<b>Daily Limit Expiry:</b> " +
      response.data.dailyLimitExpiration.toString().slice(0, 10);
    document.getElementById("exp").innerHTML =
      "<b>Token Expiry:</b> " +
      response.data.tokenExpiration.toString().slice(0, 10);
  } else {
    document.getElementById("errs").innerHTML = `<p class="err-msg">Error -
          <span id ="err-msg-text">
            </span>  
        </p>`;
    // clear elements inside after-token-result div
    document.getElementById("after-token-result").innerHTML = "";
    document.getElementById("err-msg-text").innerHTML = response.message;
  }
}
