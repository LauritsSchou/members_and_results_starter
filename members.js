function constructMember(memberdata) {
  const MemberObject = {
    id: memberdata.id,
    firstName: memberdata.firstName,
    lastName: memberdata.lastName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: memberdata.dateOfBirth,
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,

    get age() {
      const dob = new Date(this.birthday);
      const monthDiff = Date.now() - dob.getTime();
      const ageDateFormat = new Date(monthDiff);
      const year = ageDateFormat.getUTCFullYear();
      const age = Math.abs(year - 1970);
      return age;
    },
    get isJunior() {
      if (this.age < 18) {
        return true;
      } else {
        return false;
      }
    },
    get isSenior() {
      if (this.age >= 18) {
        return true;
      } else {
        return false;
      }
    },
  };
  Object.freeze(memberdata.id);
  Object.defineProperty(MemberObject, "name", {
    value: memberdata.firstName + " " + memberdata.lastName,
    enumerable: false,
  });
  Object.defineProperty(MemberObject, "image", {
    value: memberdata.image,
    enumerable: false,
  });
  return MemberObject;
}
export { constructMember };
