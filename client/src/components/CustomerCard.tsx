import type { Customer } from "../types/models";
import { getStatusStyles } from "../utils/statusStyles";

interface CustomerCardProps {
  customer: Customer;
  onSelect: () => void;
}

function CustomerCard({ customer, onSelect }: CustomerCardProps) {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-slate-700  hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-lg font-semibold text-white">
          <h2 className="text-lg font-semibold text-gray-900 !text-black">
            {customer.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500 text-left">
            {customer.customerId}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${getStatusStyles(customer.accountStatus)}`}
        >
          {customer.accountStatus}
        </span>
      </div>

      {/* email and phone */}
      <div className="mt-3 space-y-5 text-left">
        <div>
          <p className="text-xs font-semibold uppercase teracking- wider text-slate-200 !text-black">
            EMAIL
          </p>
          <p className="mt-1 break-all text-sm text-gray-500 font-semibold">
            {customer.email}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase teracking- wider text-slate-200 !text-black">
            PHONE
          </p>
          <p className="mt-1 break-all text-sm text-gray-500 font-semibold">
            {customer.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;
