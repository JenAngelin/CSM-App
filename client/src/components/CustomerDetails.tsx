import type { Customer } from "../types/models";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import { GET_CUSTOMER, GET_SUBSCRIPTIONS } from "../graphql/queries";
import { REMOVE_SUBSCRIPTION } from "../graphql/mutations";
import type { GetCustomerData, GetSubscriptionsData } from "../types/graphql";
import AddSubscriptionModal from "./AddSubscriptionModal";
import { getStatusStyles } from "../utils/statusStyles";

interface CustomerDetailsProps {
  customer: Customer;
}

function CustomerDetails({ customer }: CustomerDetailsProps) {
  const { data, loading, error } = useQuery<GetCustomerData>(GET_CUSTOMER, {
    variables: { customerId: customer.customerId },
  });
  const {
    data: subscriptionsData,
    loading: subscriptionsLoading,
    error: subscriptionsError,
  } = useQuery<GetSubscriptionsData>(GET_SUBSCRIPTIONS);
  const [showModal, setShowModal] = useState(false);

  const [removeSubscription, { loading: removingSubscription }] =
    useMutation(REMOVE_SUBSCRIPTION);

  if (loading) {
    return <p>Loading customer details...</p>;
  }
  if (error) {
    return <p>Failed to load customer details.</p>;
  }
  if (subscriptionsLoading) {
    return <p>Loading subscription packages...</p>;
  }
  if (subscriptionsError) {
    return (
      <p>Failed to load subscription packages.:{subscriptionsError.message}</p>
    );
  }
  if (!data?.customer) {
    return <p>Customer details not found.</p>;
  }

  const selectedCustomer = data.customer;
  const activeSubscriptions = selectedCustomer.subscriptions.filter(
    (subscription) => subscription.status === "ACTIVE",
  );

  return (
    <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-900 !text-black">
        Customer Details
      </h2>

      {/* customer details */}
      <div className=" rounded-lg   border border-slate-200 bg-white p-6 shadow-sm ">
        <div className="flex items-start justify-between ">
          <h3 className="text-xl font-bold text-slate-900">
            {customer.name} -
            <span className="text-gray-700"> {customer.customerId}</span>
          </h3>
          {/* account status */}
          <span
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${getStatusStyles(customer.accountStatus)}`}
          >
            {customer.accountStatus}
          </span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Email
            </p>
            <p className="mt-2 text-base font-medium text-slate-900">
              {customer.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Phone Number
            </p>
            <p className="mt-2 text-base font-medium text-slate-900">
              {customer.phoneNumber}
            </p>
          </div>
        </div>
      </div>
      {/* ADD SUBSCRIPTION MODAL */}
      {showModal && (
        <AddSubscriptionModal
          customerId={customer.customerId}
          subscriptions={subscriptionsData?.subscriptions ?? []}
          activeSubscriptions={activeSubscriptions}
          onClose={() => setShowModal(false)}
        />
      )}
      {/* ACTIVE SUBSCRIPTIONS & ADD SUBS */}
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className=" text-2xl font-semibold !text-black">
            Active Subscriptions
          </h3>
          <button
            type="button"
            disabled={customer.accountStatus !== "ACTIVE"}
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-2.5
          text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
          >
            + Add Subscription
          </button>
        </div>
      </div>
      {activeSubscriptions.length === 0 ? (
        <div className="rounded-xl p-8 text-center">
          <p className=" text-sm text-gray-500">
            No active subscriptions found.
          </p>
        </div>
      ) : (
        <div className="space-y-4 ">
          {activeSubscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="mx-auto w-full max-w-xl rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <div className="grid grid-cols-3 items-start gap-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {subscription.name}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    Type: {subscription.type}
                  </p>
                </div>

                {/* status + price */}
                <div className="flex items-center gap-12">
                  <div className="px-6 border-r">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-green px-3 py-1 text-xs font-bold text-green-700">
                      {subscription.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Price
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      ${subscription.price}
                    </p>
                  </div>
                </div>
              </div>
              {/* Remove Subscription */}
              <div className="mt-1 flex justify-center  border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Please confirm to remove ${subscription.name}`,
                    );
                    if (!confirmed) {
                      return;
                    }
                    removeSubscription({
                      variables: {
                        customerId: customer.customerId,
                        subscriptionId: subscription.id,
                      },
                      refetchQueries: [GET_CUSTOMER],
                    });
                  }}
                  disabled={removingSubscription}
                  className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                >
                  {removingSubscription ? "Removing..." : "Remove Subscription"}
                </button>
              </div>
            </div>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;
