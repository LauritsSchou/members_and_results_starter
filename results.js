import { findMember } from "./script.js";

function constructResult(resultData) {
  const ResultObject = {
    id: resultData.id,
    competitionLocation: resultData.competitionLocation,
    competitionName: resultData.competitionName,
    competitionPlacement: resultData.competitionPlacement,
    date: resultData.date,
    discipline: resultData.discipline,
    memberId: resultData.memberId,
    resultType: resultData.resultType,
    originalTime: resultData.time,
    time: resultData.time,
    member: findMember(resultData.memberId),
  };
  Object.freeze(resultData.id);
  Object.defineProperty(ResultObject, "setTimeFromString", {
    value: function () {
      const timeParts = this.time.split(":");
      const minutes = parseInt(timeParts[0], 10);
      const secondsAndMilliseconds = timeParts[1].split(".");
      const seconds = parseInt(secondsAndMilliseconds[0], 10);
      const milliseconds = parseInt(secondsAndMilliseconds[1], 10);

      const totalTimeInSeconds = minutes * 60 + seconds + milliseconds / 100;

      this.time = totalTimeInSeconds;
    },
    enumerable: false,
  });
  Object.defineProperty(ResultObject, "isTraining", {
    value: function () {
      if (this.resultType === "training") {
        return true;
      } else {
        return false;
      }
    },
    enumerable: false,
  }),
    Object.defineProperty(ResultObject, "isCompetition", {
      value: function () {
        if (this.resultType === "competition") {
          return true;
        } else {
          return false;
        }
      },
      enumerable: false,
    }),
    ResultObject.setTimeFromString(resultData.time);
  return ResultObject;
}
export { constructResult };
