// pages/restaurant_pages/FoodMark.jsx
export function FoodMark({ isVeg, size = 14 }) {
  const color = isVeg ? "#10b981" : "#e11d48";
  return (
    <span 
      className={`inline-flex items-center justify-center flex-shrink-0 rounded-sm border-2`}
      style={{ width: size, height: size, borderColor: color }}
    >
      {isVeg ? (
        <span 
          className="rounded-full" 
          style={{ width: size * 0.5, height: size * 0.5, background: color }} 
        />
      ) : (
        <span 
          className="block" 
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size * 0.3}px solid transparent`,
            borderRight: `${size * 0.3}px solid transparent`,
            borderBottom: `${size * 0.53}px solid ${color}`
          }} 
        />
      )}
    </span>
  );
}

// Add default export for Next.js page requirement
const FoodMarkPage = () => {
  return <div>FoodMark Component - This is not a page</div>;
};

export default FoodMarkPage;