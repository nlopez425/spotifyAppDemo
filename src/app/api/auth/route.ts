import { NextRequest, NextResponse } from "next/server"
import { clientId, clientSecret} from '../../secrets';

export async function GET(request: NextRequest, response:NextResponse) {
  const code = await request.nextUrl.searchParams.get("code") || null
  if(code === null){
    return NextResponse.redirect("/auth/error");
  }else{
    const fetchToken = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://127.0.0.1:3000/api/auth"
    })
  });

    if(!fetchToken.ok){
      return NextResponse.redirect("http://127.0.0.1:3000/auth/error");
    }

    const tokenData = await fetchToken.json();
    // Set token in cookie
    const response = NextResponse.redirect("http://127.0.0.1:3000/dashboard");
    response.cookies.set("spotify_token", tokenData.access_token, { httpOnly: true, secure: true, path: '/' });
    return response;
  }
}