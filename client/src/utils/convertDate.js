function convertDateToDDMMYYYY(inputDate) {
  const parts = inputDate.split("-");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
export default convertDateToDDMMYYYY;
