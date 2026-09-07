export const getStatusStyles = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700 border border-green-500";
    case "SUSPENDED":
      return "bg-yellow-100 text-yellow-700 border border-yellow-500";
    case "CLOSED":
      return "bg-red-500/15 text-red-400 border border-red-500/20";
    default:
      return "bg-slate-500 text-slate-400 border border-slate-500";
  }
};
