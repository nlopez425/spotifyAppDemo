import {clientId} from "../../secrets"

export async function POST(request: Request) {
  const scope = "user-top-read";
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: "http://127.0.0.1:3000/api/auth",
  }).toString();

  // Return the URL as JSON, don't redirect
  return new Response(JSON.stringify({
    url: `https://accounts.spotify.com/authorize?${queryParams}`
  }), {
    headers: { "Content-Type": "application/json" }
  });
}