import dayjs from "dayjs";

export const formatDate = (isoString) => {
  return dayjs(isoString).format("DD/MM/YYYY HH:mm");
};
