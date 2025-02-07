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

export async function logout() {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      credentials: "include",
    });
  } catch (e) {
    console.error(e);
  }
}

export async function checkStatus() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/status`, {
      credentials: "include",
    });
    if (res.status >= 400) {
      return false;
    }
    const user = await res.json();
    return user;
  } catch (e) {
    console.error(e);
  }
}
