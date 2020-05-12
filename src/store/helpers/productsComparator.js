export const productsComparator = (p1, p2) => {
  // return p1.createTimestamp < p2.createTimestamp;
  if (p1.completionStatus === p2.completionStatus) {
    return p1.createTimestamp < p2.createTimestamp;
  }
  return p1.completionStatus < p2.completionStatus;
};
