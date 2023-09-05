import "./TodosCategory.css";

type Props = {
  setActive: (category: string) => void;
};

const TodosCategory = ({ setActive }: Props) => {
  return (
    <section className="categories">
      <button onClick={() => setActive("All")}>All</button>
      <button onClick={() => setActive("Active")}>Active</button>
      <button onClick={() => setActive("Completed")}>Completed</button>
    </section>
  );
};

export default TodosCategory;
