const CoolCard = ({ title, children}: { title: string, children: React.ReactNode}) => {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden my-4 transition-shadow duration-300">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  };
  
  export default CoolCard;