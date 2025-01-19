import { useRef, useState, Fragment, useId } from "react";
import { FiPlusSquare, FiMinusSquare, FiTrash } from "react-icons/fi";
import classNames from "classnames";
import equal from "fast-deep-equal";
import { getTags } from "../../services/tag.js";

export const RecipeForm = ({ onSubmit, recipe: initialRecipe }) => {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [preview, setPreview] = useState(initialRecipe.bannerImage);
  const bannerImageRef = useRef(null);
  const [tags, setTags] = useState([]);
  const id = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(recipe);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bannerImage") {
      // File upload
      const file = e.target.files[0];
      if (file) {
        // Generate a preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result); // Set preview URL
          setRecipe((prev) => ({ ...prev, [name]: reader.result }));
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

  const handleAddTags = (tag) => () => {
    setRecipe((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const handleRemoveTags = (index) => () => {
    setRecipe((prev) => ({
      ...prev,
      tags: [...prev.tags.slice(0, index), ...prev.tags.slice(index + 1)],
    }));
  };

  const handleRemoveBanner = () => {
    setPreview("");
    setRecipe((prev) => ({ ...prev, bannerImage: "" }));
    bannerImageRef.current.value = "";
  };

  const queryTags = (event) => {
    const tagQuery = event.target.value;
    if (tagQuery.length > 3) {
      getTags(tagQuery).then((res) => setTags(res));
    } else {
      setTags([]);
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-5"
      onChange={handleChange}
      onSubmit={handleSubmit}
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
          rows={5}
          name="description"
          defaultValue={recipe.description}
          placeholder="Oma's Pfannkuchen"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-slate-400">Banner</label>
        <input
          name="bannerImage"
          type="file"
          accept="image/*"
          ref={bannerImageRef}
        />
        {preview && (
          <div className="flex items-start mt-2 gap-2">
            <img
              src={`${
                preview.includes("data")
                  ? ""
                  : `${import.meta.env.VITE_API_URL}/`
              }${preview}`}
              alt="Preview"
              className="object-contain border max-w-56 rounded-md"
            />
            <FiTrash
              className="hover:text-red-500 hover:cursor-pointer"
              onClick={handleRemoveBanner}
            />
          </div>
        )}
      </div>
      <div className="w-full border-slate-200 border"></div>
      <div className="grid grid-cols-4 gap-2">
        <label className="text-sm text-slate-400">Name</label>
        <label className="text-sm text-slate-400">Anzahl</label>
        <label className="text-sm text-slate-400">Einheit</label>
        <label className="text-sm text-slate-400"></label>
        {recipe.ingredients.length === 0 && (
          <p className="col-span-4">Füge Zutaten hinzu!</p>
        )}
        {recipe.ingredients.map((ingredient, index) => (
          <Fragment key={id + index}>
            <input
              required
              className="border p-1 rounded-md"
              name="name"
              value={ingredient.name}
              onChange={(e) => {
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
                handleChangeIngredient(index, e.target.name, e.target.value);
              }}
              placeholder="2"
            />
            <select
              className="border p-1 rounded-md"
              name="unit"
              value={ingredient.unit}
              onChange={(e) => {
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
        <label className="text-sm text-slate-400 col-span-full">
          Beschreibung
        </label>
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
              rows={5}
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
      <div className="grid grid-cols-4 gap-2">
        <label className="text-sm text-slate-400 col-span-full">Tags</label>
        <div className="relative col-span-full">
          <input
            type="text"
            className="rounded-md border-slate-200 border p-1"
            onChange={queryTags}
          />
          {tags.length > 0 && (
            <div className="absolute bg-white w-full border rounded-md p-1 mt-1 overflow-scroll">
              {tags.map((tag) => (
                <option
                  key={tag._id}
                  value={tag.name}
                  onClick={handleAddTags(tag)}
                >
                  {tag.name}
                </option>
              ))}
            </div>
          )}
        </div>
        {recipe.tags.length === 0 && (
          <p className="col-span-4">Füge Tags hinzu!</p>
        )}
        {recipe.tags.map((tag, index) => (
          <div key={tag._id} className="col-span-3 flex gap-1 ">
            <div
              className="border p-1 rounded-md bg-blue-500 text-white"
              name="name"
              placeholder="Desert"
            >
              {tag.name}
            </div>
            <button type="button" onClick={handleRemoveTags(index)}>
              <FiMinusSquare className="transition-colors text-[rgba(255,0,0)]" />
            </button>
          </div>
        ))}
      </div>
      <div className="w-full border-slate-200 border rounded-md"></div>
      <div className="flex flex-row gap-5">
        <button className="p-1 rounded-md bg-slate-500 hover:bg-slate-400 text-white w-full">
          Cancel
        </button>
        <button
          className={classNames(
            {
              "cursor-not-allowed opacity-30 hover:bg-sky-500": equal(
                initialRecipe,
                recipe
              ),
            },
            "p-1 rounded-md bg-sky-500 hover:bg-sky-400 text-white w-full"
          )}
          type="submit"
          disabled={equal(initialRecipe, recipe)}
        >
          Save
        </button>
      </div>
    </form>
  );
};
