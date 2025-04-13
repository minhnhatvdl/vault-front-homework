export function truncateAddress(address: string, prefixLength = 8, suffixLength = 8): string {
  if (!address) return '';

  if (address.length <= prefixLength + suffixLength) {
    return address;
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}
