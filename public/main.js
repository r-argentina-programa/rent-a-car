/* eslint-disable */
// ejemplo de https://auth0.com/docs/quickstart/spa/vanillajs
let auth0 = null;

const configureClient = async () => {
  auth0 = await createAuth0Client({
    domain: 'dev-keuhfnl9.us.auth0.com',
    client_id: 'S4WhCcFFwK0kqFADUrfcebfC5dZVTCBX',
    audience: 'http://rent-a-car',
  });
};

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById('btn-logout').disabled = !isAuthenticated;
  document.getElementById('btn-login').disabled = isAuthenticated;

  if (isAuthenticated) {
    document.getElementById('gated-content').classList.remove('hidden');

    document.getElementById('ipt-access-token').innerHTML = await auth0.getTokenSilently();

    document.getElementById('ipt-user-profile').textContent = JSON.stringify(await auth0.getUser());
  } else {
    document.getElementById('gated-content').classList.add('hidden');
  }
};

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin,
  });
};

const getProfile = async () => {
  try {
    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();

    // Make the call to the API, setting the token
    // in the Authorization header
    const response = await fetch('http://localhost:3000/users/self', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    const responseElement = document.getElementById('profile-data');

    responseElement.innerText = JSON.stringify(responseData, {}, 2);
  } catch (e) {
    console.error(e);
  }
};

const removeSensitiveDataFromUrl = () => {
  window.history.replaceState({}, document.title, '/');
};

window.onload = async () => {
  await configureClient();

  updateUI();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    return;
  }

  const query = window.location.search;
  if (query.includes('code=') && query.includes('state=')) {
    // Process the login state
    await auth0.handleRedirectCallback();

    updateUI();

    removeSensitiveDataFromUrl();
  }
};
