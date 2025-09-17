export default function GlowingLine() {
  return (
    <div className="relative flex items-center justify-center w-full h-16">
      {/* Glowing line */}
      <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent blur-sm"></div>
      
      {/* Stronger core line for brightness */}
      <div className="absolute w-1/3 h-[1px] bg-red-500 shadow-[0_0_20px_5px_rgba(255,0,0,0.6)]"></div>
    </div>
  );
}
