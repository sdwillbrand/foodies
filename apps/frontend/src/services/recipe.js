export async function getRecipes(opt) {
  try {
    const page = (opt && opt.page) ?? 1;
    const userId = opt && opt.page;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/${
        userId ? `${userId}/` : ""
      }?${new URLSearchParams({ page })}`,
      {
        credentials: "include",
      }
    );
    const recipes = await res.json();
    return recipes;
  } catch (e) {
    console.error(e);
    return [];
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
