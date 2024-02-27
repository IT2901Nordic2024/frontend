import { useLocation, useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation function to the profil page
  function goToProfilePage() {
    navigate('/profile');
  }

  // Navigation function to the habit/home page
  function goToHabitsPage() {
    navigate('/my-habits');
  }

  // Navigation function to the configuration page
  function goToConfigurationPage() {
    navigate('/configure-device');
  }

  return (
    <>
    <div className="w-screen h-14 bg-[#334155] flex fixed bottom-0 border-t border-[#E4E4E7] z-50">
        <div onClick={goToProfilePage} className="cursor-pointer flex items-center justify-center w-1/3" style={{ backgroundColor: location.pathname === '/profile' ? '#1E293B' : 'transparent' }}>
            <img src="user.png" alt="user" />
        </div>
        <div onClick={goToHabitsPage} className="cursor-pointer flex items-center justify-center w-1/3" style={{ backgroundColor: location.pathname === '/my-habits' ? '#1E293B' : 'transparent' }}>
            <img src="home.png" alt="home" />
        </div>
        <div onClick={goToConfigurationPage} className="cursor-pointer flex items-center justify-center w-1/3" style={{ backgroundColor: location.pathname === '/configure-device' ? '#1E293B' : 'transparent' }}>
            <img src="plus.png" alt="plus" />
        </div>
    </div>
    </>
  );
}
