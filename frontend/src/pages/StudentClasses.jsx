export default function StudentClasses() {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-secondary mb-4">Your Enrolled Classes</h1>
        <div className="space-y-4">
          {['Mathematics 101', 'Physics Basics', 'Introduction to Programming'].map((course, index) => (
            <div key={index} className="p-4 bg-background rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-secondary">{course}</h2>
              <p className="text-secondary/80">Class progress: 65%</p>
            </div>
          ))}
        </div>
      </div>
    )
  }