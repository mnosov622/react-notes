import { useState } from "react";
import "./TodosCategory.css";

type Props = {
  setActive: (category: string) => void;
};

const TodosCategory = ({ setActive }: Props) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSetActive = (category: string) => {
    setActive(category);
    setActiveCategory(category);
  };

  return (
    <section className="categories">
      <button
        className={activeCategory === "All" ? "active" : ""}
        onClick={() => handleSetActive("All")}
      >
        All
      </button>
      <button
        className={activeCategory === "Active" ? "active" : ""}
        onClick={() => handleSetActive("Active")}
      >
        Active
      </button>
      <button
        className={activeCategory === "Completed" ? "active" : ""}
        onClick={() => handleSetActive("Completed")}
      >
        Completed
      </button>
    </section>
  );
};

export default TodosCategory;
