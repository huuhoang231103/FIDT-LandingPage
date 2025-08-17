import React from "react";
import { AlertCircle } from "lucide-react";

// Input Field Component
export const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    />
    {error && (
      <p className="text-sm text-red-600 mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
      </p>
    )}
  </div>
);

// TextArea Field Component
export const TextAreaField = ({ label, id, value, onChange, error, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      rows="5"
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    />
    {error && (
      <p className="text-sm text-red-600 mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
      </p>
    )}
  </div>
);

// Checkbox Field Component
export const CheckboxField = ({ id, checked, onChange, label }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      name={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
      {label}
    </label>
  </div>
);

// Dropdown Field Component
export const DropdownField = ({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  options,
  isOpen,
  onToggle,
  isLoading = false,
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between ${
          error ? "border-red-500" : "border-gray-300"
        } ${value ? "text-gray-900" : "text-gray-500"}`}
      >
        <span>
          {isLoading ? "Đang tải..." : (value || placeholder)}
        </span>
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        ) : (
          <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500 text-center">Đang tải...</div>
          ) : options.length === 1 ? (
            <div className="px-4 py-2 text-gray-500 text-center">Không có dịch vụ nào</div>
          ) : (
            options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange({ target: { name: id, value: option } });
                  onToggle();
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                {option}
              </button>
            ))
          )}
        </div>
      )}
    </div>
    {error && (
      <p className="text-sm text-red-600 mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
      </p>
    )}
  </div>
);
