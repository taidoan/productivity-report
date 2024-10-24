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
  const darkHeaderBg = 'dark:bg-grey-950 print:bg-black print:dark:bg-black'
  const darkCellBg = 'dark:bg-grey-900 print:dark:bg-white'
  const border = `border-2 border-slate-800 border-collapse dark:border-grey-950 print:border-black print:dark:border-black`
  const dataClass = 'p-2 px-3'

  const darkHeaderClasses = darkHeaderBg
  const headerClasses = `bg-slate-800 text-white font-bold p-2 px-3 print:bg-black ${darkHeaderClasses}`
  const prodHeaderClasses = `${border} !border-4 p-2 px-3`

  const darkItemClass = `${darkCellBg} dark:text-gray-100`
  const itemClass = `grow bg-white ${darkItemClass} ${border} print:dark:bg-white print:!text-black`

  const prodItemClass = `${border} bg-white print:bg-white print:!text-black `

  const darkNameClass = `dark:!bg-grey-950 dark:text-white dark:md:!bg-grey-900 dark:md:!text-gray-300 print:dark:!bg-white print:dark:!text-black`
  const nameClass = `bg-slate-900 text-white font-bold md:!bg-white md:!text-inherit md:font-normal ${darkNameClass} print:bg-white print:!text-black`

  const darkTableCellClass = `${darkCellBg} dark:text-gray-100 print:dark:bg-white print!:text-black`
  const tableCellClass = `block before:content-[attr(data-cell)] before:font-bold md:table-cell md:before:content-[''] ${darkTableCellClass} ${border} md:border-4 print:table-cell print:before:content-none`
  
  const rowClass = `block mt-3 print:table-row md:table-row md:mt-0 ${border}`;

  const hitTargetColour = '!bg-lime-500 dark:!bg-lime-800 print:dark:!bg-lime-500 print:!bg-lime-500'
  const overTargetColour = '!bg-amber-400 dark:!bg-amber-600 print:dark:!bg-amber-400 print:!bg-amber-400'  
  const failedTargetColour = '!bg-red-500 dark:!bg-red-600 print:dark:!bg-red-500 print:!bg-red-500'

  const hitTargetKey = (<span className={`${hitTargetColour} inline-block w-3 h-3 mr-2`}></span>);
  const overTargetKey = (<span className={`${overTargetColour} inline-block w-3 h-3 mr-2`}></span>)
  const failedTargetKey = (<span className={`${failedTargetColour} inline-block w-3 h-3 mr-2`}></span>)

  const getPrepTimeClass = (prepTime: string | undefined, prepTarget: number) => {
    const prepTimeValue = convertTimeToMinutes(prepTime || '0:00');

    if (prepTarget === 9) {
      if(prepTimeValue <= prepTarget) return hitTargetColour
      return failedTargetColour
    }
  
    if (prepTimeValue <= prepTarget) return hitTargetColour;
    if (prepTimeValue < prepTarget + 1) return overTargetColour;
    return failedTargetColour;
  };

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

  const renderSalesPerformance = (sales: number | null, salesTarget: number | null) => {
    if (!sales || salesTarget === null) return null;

    const salesDifference = Math.abs(salesTarget - sales);
    const percentageDifference = (salesDifference / salesTarget * 100).toFixed(2);
    const isBelowTarget = sales < salesTarget;
    const percentageClass = isBelowTarget ? 'text-red-500' : 'dark:text-lime-500 text-lime-700';
  
    return (
      <p>
        We&apos;ve taken <span className="font-bold">£{sales}</span> in food sales this week.
        This was £{salesDifference}
        <span className={`text-sm ${percentageClass}`}>
          {isBelowTarget ? ` (-${percentageDifference}%)` : ` (+${percentageDifference}%)`}
        </span>
        {isBelowTarget ? "below" : "above"} the target of <strong>£{salesTarget}</strong>.
      </p>
    );
  };

  const renderPerformanceKeys = (label: string, keys: JSX.Element[]) => (
    <div className="rounded-xl grow content-center xl:content-start lg:text-left bg-grey-50 shadow-md p-4 px-5 dark:bg-grey-700 dark:shadow-md print:!shadow-none print:!bg-white print:!p-0 print:content-start">
      <h2 className="uppercase text-2xl font-bold mb-1 xl:mb-2">{label}</h2>
      <hr className="border-grey-300 dark:border-grey-500 hidden lg:block mb-2 xl:mb-3" />
      <ul>{keys}</ul>
    </div>
  );
  
  const prepKeys = renderPerformanceKeys("Prep Time", [
    <li key="prep-target-0">{hitTargetKey} {prepTarget} minutes or under prep time.</li>,
    prepTarget === 9
      ? <li key="prep-failed-1">{failedTargetKey} Over {prepTarget} minutes prep time.</li>
      : <>
        <li key="prep-under-2">{overTargetKey} Under {prepTarget + 1} minutes prep time.</li>
        <li key="prep-failed-under-3">{failedTargetKey} Over {prepTarget + 1} minutes prep time.</li>
      </>
  ]);
  
  const waitKeys = renderPerformanceKeys("Wait Time", [
    <li key="wait-target-0">{hitTargetKey} {foodLift ? "1:30" : "1:00"} minutes or under wait time.</li>,
    <li key="wait-failed-1">{failedTargetKey} Over {foodLift ? "1:30" : "1:00"} minutes wait time.</li>
  ]);
  
  const deliveryKeys = renderPerformanceKeys("Delivery Time", [
    <li key="delivery-hit-0">{hitTargetKey} Under 10 minutes delivery.</li>,
    <li key="delivery-failed-1">{failedTargetKey} Over 10 minutes delivery.</li>,
  ]);
  
  const latesKeys = renderPerformanceKeys("Late Orders", [
    <li key="late-hit-0">{hitTargetKey} {lateTarget}% or under late orders.</li>,
    <li key="late-over-1">{overTargetKey} Over {lateTarget}% late orders.</li>,
    <li key="late-failed-2">{failedTargetKey} Over {lateTarget + 10}% late orders.</li>,
  ]);
  
  
  
  
  return (
    <div id="printable">
      <div className="rounded-xl bg-grey-50 shadow-md p-6 dark:bg-grey-700 dark:shadow-md printSettings print:!bg-white print:p-0 print:rounded-none print:shadow-none">
        {serviceSummary && 
          (
            <div className="lg:w-10/12 mx-auto mb-6 print:mx-0 print:w-full print:text-left ">
              <h2 className="uppercase text-4xl font-bold mb-1">{serviceSummary.siteName} Kitchen Report</h2>
              {productivity && (
                <p>{productivity.range}</p>
              )}
              {renderSalesPerformance(sales, salesTarget)}
            </div>
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
          <table className="text-left md:bg-white w-full md:text-center mt-6 md:table border-collapse print:text-center print:table">
            <thead className={`bg-slate-800 text-white font-bold hidden md:table-header-group print:table-header-group ${darkHeaderBg}`}>
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
      <div className="lg:w-10/12 mx-auto my-8 mb-6 print:w-full print:text-left">
        <h2 className="uppercase text-4xl font-bold mb-1 print:hidden">Understanding The Report</h2>
        <p>The floor team requires at least {foodLift ? (<><strong>1:30</strong> minutes</>) : (<><strong>1:00</strong> minute</>)} to deliver food sent from kitchen.</p>
      </div>
      <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-4 print:flex">
        {prepKeys}
        {waitKeys}
        {deliveryKeys}
        {latesKeys} 
      </div>
    </div>
  )
}

export default ProductivityResult
