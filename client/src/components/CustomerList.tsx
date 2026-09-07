import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import CustomerCard from "./CustomerCard";
import CustomerDetails from "./CustomerDetails";
import { GET_CUSTOMERS } from "../graphql/queries";
import type { GetCustomersData } from "../types/graphql";
import { useCustomerContext } from "../context/useCustomerContext";

function CustomerList() {
  const { state, dispatch } = useCustomerContext();
  const { data, loading, error } = useQuery<GetCustomersData>(GET_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  if (loading) {
    return <p>Loading the list of customers...</p>;
  }
  if (error) {
    return <p>Failed to load the customers.</p>;
  }
  if (!data?.customers) {
    return <p>No customers found.</p>;
  }

  const selectedCustomer = state.selectedCustomerId
    ? data.customers.find(
        (customer) => customer.customerId === state.selectedCustomerId,
      )
    : undefined;

  if (selectedCustomer) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-8 ">
        <div className="mx-auto mb-6 max-w-6xl">
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: "CLEAR_CUSTOMER",
              })
            }
            className="flex items-start gap-2  rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:border-slate-400 hover:bg-slate-800 shadow-sm transition-all duration-200 focus:outline:none focus:ring-2 focus:ring-slate-500 cursor-pointer"
          >
            BACK
          </button>
        </div>
        <div className="mx-auto max-w-6xl">
          <CustomerDetails customer={selectedCustomer} />
        </div>
      </div>
    );
  }

  //search and filtering
  const filteredCustomers = data.customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.customerId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || customer.accountStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      {/* search and status filter */}
      <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-lg ">
        <div className="flex w-full items-end gap-6">
          <div className="flex-1">
            <label className="mb-3 block text-sm font-semibold text-left text-gray-300">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or customer ID"
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="w-64">
            <label className="mb-3 block text-sm font-semibold text-left text-slate-200">
              Account Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 "
            >
              <option value="ALL">All </option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty state and customer selection */}
      {filteredCustomers.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-10 text-center">
          <p className="text-lg font-semibold text-white-700">
            No Customers Found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.customerId}
              customer={customer}
              onSelect={() =>
                dispatch({
                  type: "SELECT_CUSTOMER",
                  payload: customer.customerId,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerList;
