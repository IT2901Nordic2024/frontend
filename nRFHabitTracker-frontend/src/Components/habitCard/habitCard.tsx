import { Card, CardDescription } from '../shadcnComponents/card'

// interface for the habit card props
interface HabitCardProps {
  id: string
  name: string
  bgColor: string
  onClick?: () => void
}

const HabitCard: React.FC<HabitCardProps> = ({ id, name, bgColor, onClick }) => {
  return (
    // Card component representing a habit card
    <Card
      key={id}
      style={{ cursor: 'pointer' }}
      className={`w-full md:w-[30%] h-[70px] mx-auto flex flex-col justify-center my-2 relative overflow-hidden ${bgColor}`}
      onClick={onClick}
    >
      {/* Description of the habit */}
      <CardDescription className="text-black pl-6 hover:underline">{name}</CardDescription>
      {/* Arrow icon for indicating clickability */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Card>
  )
}

export default HabitCard
