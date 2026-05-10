// Ця функція просто готує текст для екрана
export const formatButtonText = (text) => {
  if (!text) return "Повідомлення відсутнє";
  return `Ви натиснули: ${text}`;
};
