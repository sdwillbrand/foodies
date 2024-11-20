import { useState, Fragment } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";

export const RecipeForm = ({ onSubmit, onChange, recipe: initialRecipe }) => {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [preview, setPreview] = useState(initialRecipe.bannerImage);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bannerImage") {
      // File upload
      const file = e.target.files[0];
      if (file) {
        onChange(file);

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
    <form
      className="flex flex-col gap-5"
      onChange={handleChange}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col">
        <label className="text-sm text-slate-400">Titel</label>
        <input
          required
          className="border p-1 rounded-md"
          name="title"
          defaultValue={recipe.title}
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
          defaultValue={recipe.description}
          placeholder="Oma's Pfannkuchen"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-slate-400">Banner</label>
        <input name="bannerImage" type="file" />
        {preview && (
          <img
            src={`${import.meta.env.VITE_API_URL}/${preview}`}
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
          <Fragment key={ingredient.name + index}>
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
          </Fragment>
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
        {recipe.instructions.map((instructions, index) => (
          <div key={index} className="col-span-3 flex gap-1">
            <p>{index + 1}.</p>
            <textarea
              required
              className="border p-1 rounded-md"
              cols={50}
              name="description"
              value={instructions.description}
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
        className="p-1 rounded-md bg-sky-500 hover:bg-sky-400 text-white"
        type="submit"
      >
        Speichern
      </button>
    </form>
  );
};