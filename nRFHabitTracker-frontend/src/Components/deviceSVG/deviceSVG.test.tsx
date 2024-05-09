import { render, screen } from '@testing-library/react'
import SVGComponent from './deviceSVG'
import '@testing-library/jest-dom'

describe('SVGComponent', () => {
  const mockDeviceData = [
    { 0: 'Reading', 1: 'Workout', 2: 'Meditation' }, // mock data structure
  ]

  it('renders without crashing', () => {
    render(<SVGComponent svgHeight={300} selectedSide={1} deviceData={mockDeviceData} />)
    expect(screen.getByTestId('device-svg')).toBeInTheDocument()
  })

  it('displays the correct habit based on selected side', () => {
    render(<SVGComponent svgHeight={300} selectedSide={1} deviceData={mockDeviceData} />)
    expect(screen.getByText('Workout')).toBeInTheDocument()
  })

  it('displays "No habit connected" when selected side has no data', () => {
    render(<SVGComponent svgHeight={300} selectedSide={3} deviceData={mockDeviceData} />)
    expect(screen.getByText('No habit connected')).toBeInTheDocument()
  })

  it('displays "Select a side" when selectedSide is 12', () => {
    render(<SVGComponent svgHeight={300} selectedSide={12} deviceData={mockDeviceData} />)
    expect(screen.getByText('Select a side')).toBeInTheDocument()
  })
})
