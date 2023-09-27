function construct(resultData) {
  const resultObj = {
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
    setTimeFromString(time) {
      const timeParts = time.split(":");
      const minutes = parseInt(timeParts[0], 10);
      const secondsAndMilliseconds = timeParts[1].split(".");
      const seconds = parseInt(secondsAndMilliseconds[0], 10);
      const milliseconds = parseInt(secondsAndMilliseconds[1], 10);

      const totalTimeInSeconds = minutes * 60 + seconds + milliseconds / 100;

      this.time = totalTimeInSeconds;
    },
    isTraining() {
      if (this.resultType === "training") {
        return true;
      } else {
        return false;
      }
    },
    isCompetition() {
      if (this.resultType === "competition") {
        return true;
      } else {
        return false;
      }
    },
  };
  Object.freeze(resultData.id);
  resultObj.setTimeFromString(resultData.time);
  return resultObj;
}
export { construct };
