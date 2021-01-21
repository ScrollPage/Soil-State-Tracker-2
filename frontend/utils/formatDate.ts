
export const formatDate = (date: Date) => {
  let dd = date.getDate();
  // @ts-ignore
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  // @ts-ignore
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear();

  return yy + "-" + mm + "-" + dd;
}