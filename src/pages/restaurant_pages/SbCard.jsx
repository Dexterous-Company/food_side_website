// components/SbCard.jsx
export function SbCard({ title, icon, children, style = {} }) {
  return (
    <div className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm" style={style}>
      <div className="bg-[#1a1a1a] py-3.5 px-5 flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-lg bg-orange-600/15 border border-orange-600/25 flex items-center justify-center text-[#ff581b]">
          {icon}
        </div>
        <span className="text-[13px] font-extrabold text-white">{title}</span>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}