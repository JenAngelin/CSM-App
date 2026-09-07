import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_SUBSCRIPTION } from "../graphql/mutations";
import { GET_CUSTOMER } from "../graphql/queries";
import type { Subscription } from "../types/models";

interface AddSubscriptionModalProps {
  customerId: string;
  subscriptions: Subscription[];
  activeSubscriptions: Subscription[];
  onClose: () => void;
}

function AddSubscriptionModal({
  customerId,
  subscriptions,
  activeSubscriptions,
  onClose,
}: AddSubscriptionModalProps) {
  const [selectedSubscriptionId, setSelecetedSubscriptionId] = useState("");
  const [duplicateError, setDuplicateError] = useState("");
  const [addSubscription, { loading }] = useMutation(ADD_SUBSCRIPTION);

  const handleAddSubscription = async () => {
    if (!selectedSubscriptionId) {
      return;
    }
    const alreadySubscribed = activeSubscriptions.some(
      (subscription) => subscription.id === selectedSubscriptionId,
    );
    if (alreadySubscribed) {
      setDuplicateError("This Subscription already exists");
      return;
    }
    setDuplicateError("");
    await addSubscription({
      variables: { customerId, subscriptionId: selectedSubscriptionId },
      refetchQueries: [GET_CUSTOMER],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold !text-black">
          Add Subscription
        </h2>

        <select
          value={selectedSubscriptionId}
          onChange={(e) => setSelecetedSubscriptionId(e.target.value)}
          className="w-full rounded-lg border border-gray-300 text-gray-900 outline-none bg-white px-4 py-3 focus:border-blue-500"
        >
          <option value=" ">Select a subscription</option>
          {subscriptions.map((subscription) => (
            <option key={subscription.id} value={subscription.id}>
              {subscription.name} - ${subscription.price}
            </option>
          ))}
        </select>

        {duplicateError && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{duplicateError}</span>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2 hover:bg-red-400 hover:text-gray-900 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedSubscriptionId || loading}
            onClick={handleAddSubscription}
            className=" rounded-lg bg-blue-600 px-5 py-2  font-medium text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Subscription"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubscriptionModal;
