import { ServiceSummary, ProductivityData } from "@/types";
import { convertTimeToMinutes } from "@/utilities/timeConverter";
type ProductivityResultProps = {
  sales: number | null,
  salesTarget: number | null,
  lateTarget: number,
  prepTarget: number,
  foodLift: boolean,
  serviceSummary: ServiceSummary | null,
  productivity: ProductivityData | null
}

const ProductivityResult = ({sales, salesTarget, lateTarget, prepTarget, foodLift, serviceSummary, productivity}: ProductivityResultProps) => {
  const headerClasses = 'bg-slate-900 text-white font-bold p-1.5'
  const dataClass = 'p-1.5'
  const itemClass = 'grow bg-white md:border border-slate-900'

  const prodItemClass = 'md:border-2 md:border-slate-900 bg-white'
  const nameClass = 'md:bg-white md:border-2 md:border-slate-900 bg-slate-900 text-white font-bold md:text-inherit md:font-normal'
  const tableCellClass = `block before:content-[attr(data-cell)] before:font-bold md:table-cell md:before:content-[''] `
  const rowClass = `block mt-3 md:table-row`;

  const hitTargetColour = 'bg-lime-400'
  const overTargetColour = 'bg-amber-400'
  const failedTargetColour = 'bg-red-400'

  const servicePrepTimeClass = `${parseFloat(serviceSummary?.averagePreparationTime.total || '0') < prepTarget ? hitTargetColour : parseFloat(serviceSummary?.averagePreparationTime.total || '0') <= prepTarget + 1 ? overTargetColour : failedTargetColour}`
  
  const serviceWaitTimeClass = `${convertTimeToMinutes(serviceSummary?.averageWaitTime.total || '0') <= (foodLift ? 1.5 : 1) ? hitTargetColour : failedTargetColour }`

  const serviceDeliveryTimeClass = `${convertTimeToMinutes(serviceSummary?.averageDeliveryTime.total || '0') >= 10 ? failedTargetColour : hitTargetColour}`

  const serviceLatesClass = `${(serviceSummary?.numberOfLateOrders.total.percentage || 0) < lateTarget ? hitTargetColour : (serviceSummary?.numberOfLateOrders.total.percentage || 0) <= lateTarget + 5 ? overTargetColour : failedTargetColour}`

  
  
  return (
    <div className="rounded-lg p-4 bg-red-200 text-center">
      {serviceSummary && 
        (
          <>
            <h2 className="uppercase text-4xl font-bold ">{serviceSummary.siteName} Productivity Report</h2>
            {productivity && (
              <p>{productivity.range}</p>
            )}
            {sales && (
              <p>
                We've taken <span className="font-bold">£{sales}</span> in food sales this week.
                {salesTarget && (
                  sales < salesTarget ? (
                    ` This was £${(salesTarget - sales).toFixed(2)} below target of £${salesTarget}.`
                  ) : (
                    ` This was £${(sales - salesTarget).toFixed(2)} above target of £${salesTarget}.`
                  )
                )}
              </p>
            )}
          </>
        )
      }

      {serviceSummary  && (
        <ul className="bg-white border border-slate-900 text-center flex flex-wrap">
          <li className={itemClass}>
            <div className={headerClasses}>Prep Time</div>
            <div className={`
              ${dataClass}
              ${servicePrepTimeClass}
            `}>
              {serviceSummary.averagePreparationTime.total}
            </div>
          </li>
          <li className={itemClass}>
            <div className={`${headerClasses}`}>Wait Time</div>
            <div className={`${dataClass} ${serviceWaitTimeClass}`}>{serviceSummary.averageWaitTime.total}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Delivery Time</div>
            <div className={`${dataClass} ${serviceDeliveryTimeClass}`}>{serviceSummary.averageDeliveryTime.total}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Orders</div>
            <div className={dataClass}>{serviceSummary.numberOfOrders}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Lates</div>
            <div className={`${dataClass} ${serviceLatesClass}`}>{serviceSummary.numberOfLateOrders.total.count} <span className="text-sm">({serviceSummary.numberOfLateOrders.total.percentage}%)</span></div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Items</div>
            <div className={dataClass}>{serviceSummary.numberOfItems}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Manual Holds</div>
            <div className={dataClass}>{serviceSummary.chef1.manualHolds}</div>
          </li>
        </ul>
      )}

      {productivity && (
        <table className="text-left md:bg-white w-full md:border-2 border-slate-900 md:text-center mt-6 md:table ">
          <thead className="bg-slate-900 text-white font-bold hidden md:table-header-group">
            <tr>
            <th className={headerClasses}>Name</th>
            <th className={headerClasses}>Prep Time</th>
            <th className={headerClasses}>Orders</th>
            <th className={headerClasses}>Items</th>
            <th className={headerClasses}>Late Orders</th>
            <th className={headerClasses}>Longest Order</th>
            <th className={headerClasses}>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {productivity.staffMembers.map((member) => (
              <tr key={member.name} className={`${rowClass} border border-slate-900`}>
                <td className={`${nameClass} ${dataClass} ${tableCellClass} border border-slate-900`}>{member.name}</td>
                <td className={`${prodItemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Prep Time: ">{member.prepTime}</td>
                <td className={`${prodItemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Orders: ">{member.orders}</td>
                <td className={`${prodItemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Items: ">{member.items}</td>
                <td className={`${prodItemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Late Orders: ">{member.lateOrders} <span className="text-sm">({member.lateOrdersPercentage}%)</span></td>
                <td className={`${prodItemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Longest Order: ">{member.longestOrder}</td>
                <td className={`${prodItemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Hours Worked: ">{member.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} 
    </div>
  )
}

export default ProductivityResult