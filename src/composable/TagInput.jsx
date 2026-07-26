import { useState } from "react";

const TagInput = ({ name, value = [], setFieldValue, placeholder }) => {
  const [inputVal, setInputVal] = useState("");

  const addTag = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    setFieldValue(name, [...value, trimmed]);
    setInputVal("");
  };

  const removeTag = (tag) => {
    setFieldValue(name, value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-[#0061531A] text-[#006153] font-normal text-13px rounded-99px px-3 py-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="size-4 flex items-center justify-center rounded-full hover:bg-[#00615333] transition-colors text-xs leading-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="input w-full"
      />
    </div>
  );
};

export default TagInput;