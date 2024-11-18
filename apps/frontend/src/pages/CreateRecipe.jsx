import { useState } from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    bannerImage: null, // For storing the file itself,
    ingredients: [],
    instructions: [],
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bannerImage") {
      // File upload
      const file = e.target.files[0];
      if (file) {
        setRecipe((prev) => ({ ...prev, bannerImage: file }));

        // Generate a preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result); // Set preview URL
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Text input
      setRecipe((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("bannerImage", recipe.bannerImage);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("instructions", JSON.stringify(recipe.instructions));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const error = await response.json();
        console.error("Failed to save recipe: " + error.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the recipe.");
    }
  };

  const handleAddIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: 0 }],
    }));
  };

  const handleRemoveIngredient = (index) => () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients.slice(0, index),
        ...prev.ingredients.slice(index + 1),
      ],
    }));
  };

  const handleChangeIngredient = (index, target, value) => {
    setRecipe((prev) => {
      const ingredients = [...prev.ingredients];
      ingredients[index][target] = value;
      return { ...prev, ingredients };
    });
  };

  const handleAddInstruction = () => {
    setRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, { description: "" }],
    }));
  };

  const handleRemoveInstruction = (index) => () => {
    setRecipe((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions.slice(0, index),
        ...prev.instructions.slice(index + 1),
      ],
    }));
  };

  const handleChangeInstruction = (index, target, value) => {
    setRecipe((prev) => {
      const instructions = [...prev.instructions];
      instructions[index][target] = value;
      return { ...prev, instructions };
    });
  };

  return (
    <main className="flex justify-center my-10">
      <form
        className="flex flex-col gap-5"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="text-sm text-slate-400">Titel</label>
          <input
            required
            className="border p-1 rounded-md"
            name="title"
            placeholder="Pfannkuchen"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-400">Beschreibung</label>
          <textarea
            required
            className="border p-1 rounded-md"
            cols={50}
            name="description"
            placeholder="Oma's Pfannkuchen"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-400">Banner</label>
          <input name="bannerImage" type="file" />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 object-contain border max-w-56 rounded-md"
            />
          )}
        </div>
        <div className="w-full border-slate-200 border rounded-md"></div>
        <div className="grid grid-cols-4 gap-2">
          <label className="text-sm text-slate-400">Name</label>
          <label className="text-sm text-slate-400">Anzahl</label>
          <label className="text-sm text-slate-400">Einheit</label>
          <label className="text-sm text-slate-400"></label>
          {recipe.ingredients.length === 0 && (
            <p className="col-span-4">Füge Zutaten hinzu!</p>
          )}
          {recipe.ingredients.map((ingredient, index) => (
            <>
              <input
                required
                className="border p-1 rounded-md"
                cols={50}
                name="name"
                value={ingredient.name}
                onChange={(e) => {
                  e.stopPropagation();
                  handleChangeIngredient(index, e.target.name, e.target.value);
                }}
                placeholder="Eier"
              />
              <input
                required
                type="number"
                className="border p-1 rounded-md"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => {
                  e.stopPropagation();
                  handleChangeIngredient(index, e.target.name, e.target.value);
                }}
                placeholder="2"
              />
              <select
                className="border p-1 rounded-md"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => {
                  e.stopPropagation();
                  handleChangeIngredient(index, e.target.name, e.target.value);
                }}
                placeholder="Stück"
              >
                <option value={undefined}></option>
                {["ml", "l", "g", "kg", "Prise", "EL", "TL"].map((unit) => (
                  <option value={unit} key={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleRemoveIngredient(index)}>
                <FiMinusSquare className="transition-colors text-[rgba(255,0,0)]" />
              </button>
            </>
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 border rounded-md self-start p-1 border-blue-600 hover:bg-blue-600/70 hover:text-white transition-colors"
          onClick={handleAddIngredient}
        >
          Zutat <FiPlusSquare />
        </button>
        <div className="w-full border-slate-200 border rounded-md"></div>
        <div className="grid grid-cols-4 gap-2">
          <label className="text-sm text-slate-400">Beschreibung</label>
          <label className="text-sm text-slate-400"></label>
          {recipe.instructions.length === 0 && (
            <p className="col-span-4">Füge eine Anleitung hinzu!</p>
          )}
          {recipe.instructions.map((ingredient, index) => (
            <div key={index} className="col-span-3 flex gap-1">
              <p>{index + 1}.</p>
              <textarea
                required
                className="border p-1 rounded-md"
                cols={50}
                name="description"
                value={ingredient.name}
                onChange={(e) => {
                  e.stopPropagation();
                  handleChangeInstruction(index, e.target.name, e.target.value);
                }}
                placeholder="Milch und Eier zusammenrühren"
              />
              <button type="button" onClick={handleRemoveInstruction(index)}>
                <FiMinusSquare className="transition-colors text-[rgba(255,0,0)]" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 border rounded-md self-start p-1 border-blue-600 hover:bg-blue-600/70 hover:text-white transition-colors"
          onClick={handleAddInstruction}
        >
          Zubereitungsschritt <FiPlusSquare />
        </button>
        <div className="w-full border-slate-200 border rounded-md"></div>
        <button
          className="p-1 rounded-md bg-green-600 hover:bg-green-600/80 text-white"
          type="submit"
        >
          Speichern
        </button>
      </form>
    </main>
  );
};
