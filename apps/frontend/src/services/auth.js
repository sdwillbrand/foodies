export async function login(username, password) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const user = await res.json();
    return user;
  } catch (e) {
    console.error(e);
  }
}

export async function checkStatus() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/status`, {
      method: "GET",
      credentials: "include",
    });
    const user = await res.json();
    return user;
  } catch (e) {
    console.error(e);
  }
}
