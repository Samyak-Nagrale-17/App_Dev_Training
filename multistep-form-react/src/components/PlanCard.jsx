/* eslint-disable react/prop-types */

function PlanCard({ planData, selectedPlan, selected, isYearly }) {
  const { name, icon, monthly, yearly } = planData
  const isSelected = selectedPlan.plan === name
  const duration = selectedPlan.duration
  const planCost = duration === 'yearly' ? yearly : monthly

  return (
    <div 
      className={`planCard ${isSelected ? 'selected' : ''}`}
      onClick={() => selected(name)}
    >
      <div className="img_wrapper">
        <img src={icon} alt={name} />
      </div>
      <div className="planDetails">
        <p>{name}</p>
        <p className="priceTag">{`$${planCost}/${duration === 'monthly' ? 'mo' : 'yr'}`}</p>
        {isYearly && <p className="offer">2 months free</p>}
      </div>
    </div>
  )
}

export default PlanCard
