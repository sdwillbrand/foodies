export async function getRecipes(opt) {
  try {
    const p = (opt && opt.p) ?? 1;
    const q = (opt && opt.q) ?? "";
    const userId = opt && opt.userId;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/${
        userId ? `${userId}/all` : ""
      }?${new URLSearchParams({ p, q })}`,
      {
        credentials: "include",
      }
    );
    const result = await res.json();
    return result;
  } catch (e) {
    console.error(e);
    return { recipes: [], total: 0 };
  }
}

export async function getRecipe(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
      credentials: "include",
    });
    const recipes = await res.json();
    return recipes;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function updateRecipe(id, recipe) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(recipe),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedRecipe = await res.json();
    return updatedRecipe;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteRecipe(id) {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
