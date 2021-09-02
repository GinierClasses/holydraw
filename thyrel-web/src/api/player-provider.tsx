const playerTokenKey = '__player_provider_token__';

function getToken() {
  // TODO: check the token exist in the API
  return window.localStorage.getItem(playerTokenKey);
}

function destroy() {
  // TODO: invalidate the token in API
  window.localStorage.removeItem(playerTokenKey);
}

function setToken(token: string) {
  // TODO: invalidate the token in API
  window.localStorage.setItem(playerTokenKey, token);
}

export { getToken, destroy, setToken };
