export function extractNameFromEmail(email) {
  const username = email.split("@")[0];
  return username.charAt(0).toUpperCase() + username.slice(1);
}
