
function ClassCard({ grade, description }) {
  return (
    <div className="class-card">
      <h3>{grade}</h3>
      <p>{description}</p>
      <span>Physical & Online</span>
    </div>
  )
}

export default ClassCard
