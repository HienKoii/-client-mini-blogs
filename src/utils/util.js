import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const formatDate = (date) => {
  return dayjs(date).fromNow();
};

export const formatContent = (content) => {
  if (!content) return "";
  return content
    .replace(/\r\n/g, "\n") // Convert Windows line endings to Unix
    .replace(/\r/g, "\n") // Convert remaining \r to \n
    .split("\n") // Split by newlines
    .map((line) => line.trim()) // Trim each line
    .filter((line) => line) // Remove empty lines
    .join("\n"); // Join back with newlines
};
