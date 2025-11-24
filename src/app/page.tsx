'use client';

export default function Home() {
  // Fetch Spotify API token
  /*const response = await fetch("https://accounts.spotify.com/api/token",{
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "3839030b0d71479b8e982878843a1d37",
      client_secret: "0924c60c5dcc4e16a91b72fb187c502a"
    })
  });
  const token = await response.json();*/


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Logging in...");
    const res = await fetch("/api/login", { method: "POST" });
    const data = await res.json();
    console.log(data.url);
    window.open(data.url, "_self")
    //window.location.href = data.url; // Redirect from client
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Log In</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-8 items-center sm:items-start">
          <div className="flex flex-col gap-4">
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-72 sm:w-96 hover:bg-blue-600 transition-colors">Log In</button>
          </div>
        </form>
      </main>
    </div>
  );
}
