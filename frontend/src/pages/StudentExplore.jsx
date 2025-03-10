export default function StudentExplore() {
    const availableClasses = [
      'Advanced Calculus',
      'Data Structures',
      'Quantum Physics',
      'Web Development'
    ]
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-secondary mb-4">Explore Classes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableClasses.map((className, index) => (
            <div key={index} className="p-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-lg font-semibold text-secondary">{className}</h2>
              <button className="mt-2 text-primary hover:text-primary/80">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }