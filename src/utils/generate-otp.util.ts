export const generateOtpCode = () => {
  const characters: string = "0123456789";
  let result: string = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};