"use client";

export default function SearchInput({ value, onChange, onClear, placeholder, loading }) {
  return (
    <div className="relative flex items-center gap-2.5 border border-gray-200 rounded-xl px-3.5 py-3 bg-white focus-within:border-[#ff581b] transition-colors">
      <svg className="w-4 h-4 text-[#ff581b] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
      </svg>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-sm font-semibold text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
      />
      
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#ff581b] border-t-transparent"></div>
      )}
      
      {value && !loading && (
        <button onClick={onClear} className="text-gray-300 hover:text-gray-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}