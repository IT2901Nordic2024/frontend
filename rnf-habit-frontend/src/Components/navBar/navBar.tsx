
export function NavBar() {
  return (
    <div className="w-full h-14 bg-[#334155] flex fixed top-0 left-0 border-b border-[#E4E4E7] z-50">
      <img className="pl-2.5 pt-0.5 pb-0.5" src="dodIcon.png" alt="icon" />
      <div className="flex items-center ml6 flex-grow">
        <p className="text-white font-[Inter] text-base font-medium normal-case pl-6 ">NRF- Habit Tracker</p>
      </div>
      
    </div>
  );
}
