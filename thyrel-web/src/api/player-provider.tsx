const playerTokenKey = '__player_provider_token__';

function getToken() {
  // TODO: check the token exist in the API
  return window.localStorage.getItem(playerTokenKey);
}

function destroy() {
  window.localStorage.removeItem(playerTokenKey);
  // TODO: invalidate the token in API
}

export { getToken, destroy };
