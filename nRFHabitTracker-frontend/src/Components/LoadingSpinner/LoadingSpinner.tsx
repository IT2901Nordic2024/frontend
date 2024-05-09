// Contains the code for the LoadingSpinner component

import styled, { keyframes } from 'styled-components'

// Define keyframes for the spin animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Styled component for the image with animation
const SpinningImage = styled.img`
  animation: ${spin} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  width: 64px;
  height: 64px;
`

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <SpinningImage src="/dodIcon.png" alt="Loading" />
    </div>
  )
}

export default LoadingSpinner
