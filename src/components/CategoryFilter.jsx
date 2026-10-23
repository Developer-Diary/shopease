function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition ${
            selectedCategory === item
              ? "bg-[#292929] text-white"
              : "bg-white text-stone-600 border border-stone-200 hover:border-stone-500"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;