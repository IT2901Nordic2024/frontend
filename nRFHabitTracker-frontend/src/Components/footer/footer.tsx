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
        <div className="w-full h-14 bg-[#334155] flex fixed bottom-0 left-0 border-t border-[#E4E4E7] z-50">
            <div className="flex items-center justify-center w-1/3" style={{ backgroundColor: location.pathname === '/profile' ? '#1E293B' : 'transparent' }}>
                <img onClick={goToProfilePage} className="cursor-pointer pl-2.5 pt-0.5 pb-0.5" src="user.png" alt="user" />
            </div>
            <div className="flex items-center justify-center w-1/3" style={{ backgroundColor: location.pathname === '/my-habits' ? '#1E293B' : 'transparent' }}>
                <img onClick={goToHabitsPage} className="cursor-pointer pl-2.5 pt-0.5 pb-0.5" src="home.png" alt="home" />
            </div>
            <div className="flex items-center justify-center w-1/3" style={{ backgroundColor: location.pathname === '/configure-device' ? '#1E293B' : 'transparent' }}>
                <img onClick={goToConfigurationPage} className="cursor-pointer pl-2.5 pt-0.5 pb-0.5" src="plus.png" alt="plus" />
            </div>
        </div>
    </>
  );
}
