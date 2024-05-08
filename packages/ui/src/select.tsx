"use client";

export const Select = ({
  options,
  onSelect,
  label,
}: {
  options: { key: string; value: string }[];
  onSelect: (value: string) => void;
  label: string;
}) => {
  return (
    <div>
      <label className=" pb-2 block font-medium text-gray-900 text-sm">
        {label}
      </label>
      <select
        onChange={(e) => {
          onSelect(e.target.value);
        }}
        className="w-full border rounded-lg border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2"
      >
        {options.map((option) => (
          <option key={option.key}>{option.value}</option>
        ))}
      </select>
    </div>
  );
};
