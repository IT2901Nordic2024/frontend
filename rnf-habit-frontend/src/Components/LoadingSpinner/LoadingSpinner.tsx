import './LoadingSpinner.css';

export function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center">
        <img src="/dodIcon.png" className="spinner-animation" style={{ width: '64px', height: '64px' }} alt="Loading" />
      </div>
    );
  }
  