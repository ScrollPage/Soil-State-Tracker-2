import Cookie from 'js-cookie';

export const getUser = () => {
  const firstName = Cookie.get("firstName");
  const lastName = Cookie.get("lastName");
  const fullName = firstName ? `${firstName} ${lastName}` : 'AnonimousUser';
  const userId = Cookie.get('userId');
  const isStaff = Cookie.get('isStaff');
  return { fullName, firstName, lastName, userId, isStaff }
}