import { ServiceSummary, ProductivityData } from "@/types";
import { convertTimeToMinutes } from "@/utilities/timeConverter";
type ProductivityResultProps = {
  sales: number | null,
  salesTarget: number | null,
  lateTarget: number,
  prepTarget: number,
  foodLift: boolean,
  serviceSummary: ServiceSummary,
  productivity: ProductivityData | null
}

const ProductivityResult = ({sales, salesTarget, lateTarget, prepTarget, foodLift, serviceSummary, productivity}: ProductivityResultProps) => {
  const darkHeaderBg = 'dark:bg-grey-950'
  const darkCellBg = 'dark:bg-grey-700'

  const border = `border-2 border-slate-800 border-collapse dark:border-grey-950`
  const dataClass = 'p-2 px-3'

  const darkHeaderClasses = darkHeaderBg
  const headerClasses = `bg-slate-800 text-white font-bold p-2 px-3 ${darkHeaderClasses}`
  const prodHeaderClasses = `${border} !border-4 p-2 px-3`

  const darkItemClass = `${darkCellBg} dark:text-gray-100`
  const itemClass = `grow bg-white ${darkItemClass} ${border}`

  const prodItemClass = `${border}`

  const darkNameClass = `dark:!bg-grey-950 dark:text-white dark:md:!bg-grey-700 dark:md:!text-gray-300`
  const nameClass = `bg-slate-900 text-white font-bold md:bg-white md:!text-inherit md:font-normal ${darkNameClass}`

  const darkTableCellClass = `${darkCellBg} dark:text-gray-100`
  const tableCellClass = `block before:content-[attr(data-cell)] before:font-bold md:table-cell md:before:content-[''] ${darkTableCellClass} ${border} md:border-4`
  
  const rowClass = `block mt-3 md:table-row md:mt-0 ${border}`;

  const hitTargetColour = '!bg-lime-500 dark:!bg-lime-800'
  const overTargetColour = '!bg-amber-400 dark:!bg-amber-600'  
  const failedTargetColour = '!bg-red-500 dark:!bg-red-600'

  const getPrepTimeClass = (prepTime: (string | undefined), prepTarget: number) => {
    const prepTimeValue = parseFloat(prepTime || '0')
    if (prepTimeValue < prepTarget) return hitTargetColour
    if (prepTimeValue < prepTarget + 1) return overTargetColour
    return failedTargetColour
  }

  const getWaitTimeClass = (waitTime: (string | undefined), foodLift: boolean) => {
    const waitTimeMinutes = convertTimeToMinutes(waitTime || '0')
    return waitTimeMinutes <= (foodLift ? 1.5 : 1) ? hitTargetColour : failedTargetColour
  }

  const getDeliveryTimeClass = (deliveryTime: (string | undefined)) => {
    const deliveryTimeInMinutes = convertTimeToMinutes(deliveryTime || '0')
    return deliveryTimeInMinutes >= 10 ? failedTargetColour : hitTargetColour
  }

  const getLatesClass = (latePercentage: (number), lateTarget: number) => {
    if (latePercentage < lateTarget) return hitTargetColour
    if (latePercentage <= lateTarget + 10) return overTargetColour
    return failedTargetColour
  }

  const servicePrepTimeClass = getPrepTimeClass(serviceSummary?.averagePreparationTime.total, prepTarget)
  const serviceWaitTimeClass = getWaitTimeClass(serviceSummary?.averageWaitTime.total, foodLift)
  const serviceDeliveryTimeClass = getDeliveryTimeClass(serviceSummary?.averageDeliveryTime.total);
  const serviceLatesClass = getLatesClass(serviceSummary?.numberOfLateOrders.total.percentage, lateTarget)
  
  return (
    <div className="rounded-xl p-6 bg-gray-50 text-center shadow-lg dark:bg-grey-900

">
      {serviceSummary && 
        (
          <>
            <h2 className="uppercase text-4xl font-bold">{serviceSummary.siteName} Productivity Report</h2>
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

      {serviceSummary && (
        <ul className={`text-center flex flex-wrap ${border}`}>
          {[
            { label: 'Prep Time', value: serviceSummary.averagePreparationTime.total, className: servicePrepTimeClass },
            { label: 'Wait Time', value: serviceSummary.averageWaitTime.total, className: serviceWaitTimeClass },
            { label: 'Delivery Time', value: serviceSummary.averageDeliveryTime.total, className: serviceDeliveryTimeClass },
            { label: 'Orders', value: serviceSummary.numberOfOrders, className: '' },
            { label: 'Lates', value: `${serviceSummary.numberOfLateOrders.total.count} (${serviceSummary.numberOfLateOrders.total.percentage}%)`, className: serviceLatesClass },
            { label: 'Items', value: serviceSummary.numberOfItems, className: '' },
            { label: 'Manual Holds', value: serviceSummary.chef1.manualHolds, className: '' },
          ].map((item, index) => (
            <li key={index} className={`${itemClass} `}>
              <div className={headerClasses}>{item.label}</div>
              <div className={`${dataClass} ${item.className}`}>{item.value}</div>
            </li>
          ))}
        </ul>
      )}

      {productivity && (
        <table className="text-left md:bg-white w-full md:text-center mt-6 md:table border-collapse">
          <thead className={`bg-slate-800 text-white font-bold hidden md:table-header-group ${darkHeaderBg}`}>
            <tr>
              {['Name', 'Prep Time', 'Orders', 'Items', 'Late Orders', 'Longest Order', 'Hours Worked'].map((header) => (
                <th key={header} className={`${prodHeaderClasses} `}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productivity.staffMembers.map((member) => {
              const prepTimeClass = getPrepTimeClass(member.prepTime, prepTarget)
              const latesClass = getLatesClass(member.lateOrdersPercentage, lateTarget)
              
              return (
                <tr key={member.name} className={`${rowClass}`}>
                  <td className={`${dataClass} ${tableCellClass}  ${nameClass}`}>{member.name}</td>
                  <td className={`${prepTimeClass} ${prodItemClass} ${dataClass} ${tableCellClass}`} data-cell="Prep Time: ">{member.prepTime}</td>
                  <td className={`${prodItemClass} ${dataClass} ${tableCellClass}`} data-cell="Orders: ">{member.orders}</td>
                  <td className={`${prodItemClass} ${dataClass} ${tableCellClass}`} data-cell="Items: ">{member.items}</td>
                  <td className={`${latesClass} ${prodItemClass} ${dataClass} ${tableCellClass}`} data-cell="Late Orders: ">{member.lateOrders} <span className="text-sm">({member.lateOrdersPercentage}%)</span></td>
                  <td className={`${prodItemClass} ${dataClass} ${tableCellClass}`} data-cell="Longest Order: ">{member.longestOrder}</td>
                  <td className={`${prodItemClass} ${dataClass} ${tableCellClass}`} data-cell="Hours Worked: ">{member.hoursWorked}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      )} 
    </div>
  )
}

export default ProductivityResult