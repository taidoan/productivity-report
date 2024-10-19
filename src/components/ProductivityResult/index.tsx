import { ServiceSummary, ProductivityData } from "@/types";

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
  const itemClass = 'grow bg-white md:border border-slate-900 '
  const nameClass = 'md:bg-white md:border md:border-slate-900 bg-slate-900 text-white font-bold md:text-inherit md:font-normal'
  const tableCellClass = `block before:content-[attr(data-cell)] md:table-cell md:before:content-[''] before:font-bold`
  const rowClass = `block mt-3 md:table-row`;
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

      {serviceSummary && (
        // <table className="bg-white w-full border border-slate-900 text-center border-collapse overflow-x-auto">
        //   <thead className="bg-slate-900 text-white font-bold uppercase">
        //     <tr>
        //       <th>Prep</th>
        //       <th>Wait</th>
        //       <th>Delivery</th>
        //       <th>Orders</th>
        //       <th>Lates</th>
        //       <th>Items</th>
        //       <th>Holds</th>
        //     </tr>
        //   </thead>
        // </table>
        <ul className="bg-white border border-slate-900 text-center flex flex-wrap">
          <li className={itemClass}>
            <div className={headerClasses}>Prep Time</div>
            <div className={dataClass}>{serviceSummary.averagePreparationTime.total}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Wait Time</div>
            <div className={dataClass}>{serviceSummary.averageWaitTime.total}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Delivery Time</div>
            <div className={dataClass}>{serviceSummary.averageDeliveryTime.total}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Orders</div>
            <div className={dataClass}>{serviceSummary.numberOfOrders}</div>
          </li>
          <li className={itemClass}>
            <div className={headerClasses}>Lates</div>
            <div className={`${dataClass}`}>{serviceSummary.numberOfLateOrders.total.count} <span className="text-sm">({serviceSummary.numberOfLateOrders.total.percentage}%)</span></div>
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
            <th className={headerClasses}>Name</th>
            <th className={headerClasses}>Prep Time</th>
            <th className={headerClasses}>Orders</th>
            <th className={headerClasses}>Items</th>
            <th className={headerClasses}>Late Orders</th>
            <th className={headerClasses}>Longest Order</th>
            <th className={headerClasses}>Hours Worked</th>
          </thead>
          <tbody>
            {productivity.staffMembers.map((member) => (
              <tr key={member.name} className={`${rowClass} border border-slate-900`}>
                <td className={`${nameClass} ${dataClass} ${tableCellClass} border border-slate-900`}>{member.name}</td>
                <td className={`${itemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Prep Time: ">{member.prepTime}</td>
                <td className={`${itemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Orders: ">{member.orders}</td>
                <td className={`${itemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Items: ">{member.items}</td>
                <td className={`${itemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Late Orders: ">{member.lateOrders} <span className="text-sm">({member.lateOrdersPercentage}%)</span></td>
                <td className={`${itemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Longest Order: ">{member.longestOrder}</td>
                <td className={`${itemClass} ${dataClass} ${tableCellClass} border border-slate-900`} data-cell="Hours Worked: ">{member.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} 
    </div>
  )
}

export default ProductivityResult