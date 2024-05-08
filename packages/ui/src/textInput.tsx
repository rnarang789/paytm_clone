"use client";

export const TextInput = ({
  placeholder,
  label,
  onChange,
  type,
  id,
}: {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  type?: "text";
  id?: "first_name";
}) => {
  return (
    <div>
      <label className=" pb-2 block font-medium text-gray-900 text-sm">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2"
      />
    </div>
  );
};
