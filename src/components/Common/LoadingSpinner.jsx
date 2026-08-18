export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="w-full min-h-[320px] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer soft glowing ring */}
        <div className="w-16 h-16 rounded-full border-4 border-[#085027]/15 animate-ping absolute" />
        {/* Inner brand spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#085027] border-r-[#085027] animate-spin" />
      </div>
      {text && (
        <p className="text-xs sm:text-sm font-semibold text-[#085027] animate-pulse tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
}
