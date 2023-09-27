function constructMember(memberdata) {
  const MemberObject = {
    firstName: memberdata.firstName,
    lastName: memberdata.lastName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: memberdata.dateOfBirth,
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
    name() {
      return this.firstName + " " + this.lastName;
    },
    age() {
      const dob = new Date(this.birthday);
      const monthDiff = Date.now() - dob.getTime();
      const ageDateFormat = new Date(monthDiff);
      const year = ageDateFormat.getUTCFullYear();
      const age = Math.abs(year - 1970);
      return age;
    },
    isJunior() {
      if (this.age() < 18) {
        return true;
      } else {
        return false;
      }
    },
    isSenior() {
      if (this.age() >= 18) {
        return true;
      } else {
        return false;
      }
    },
  };

  return MemberObject;
}
export { constructMember };
