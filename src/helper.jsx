export const countryCodeToFlag = (code) => {
  const codePoints = code.toLowerCase();
  return <img src={`https://flagcdn.com/24x18/${codePoints}.png`} alt="flag" />;
};

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
