export function getTimeRemaining(expiryTime) {
  const now = new Date();
  const expiry = new Date(expiryTime);
  const diff = expiry - now;

  if (diff <= 0) return { text: "Expired", urgent: true, expired: true };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours < 2) return { text: `${hours}h ${minutes}m left`, urgent: true, expired: false };
  if (hours < 24) return { text: `${hours}h ${minutes}m left`, urgent: false, expired: false };

  const days = Math.floor(hours / 24);
  return { text: `${days}d ${hours % 24}h left`, urgent: false, expired: false };
}

export function getStatusColor(status) {
  switch (status) {
    case "available": return "bg-primary-100 text-primary-700";
    case "requested": return "bg-alert-100 text-alert-600";
    case "completed": return "bg-gray-100 text-gray-600";
    default: return "bg-gray-100 text-gray-600";
  }
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
