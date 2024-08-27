// convert camel case string yto normal
export default function NormalCase(input) {
  let secondHalfStart = input.search(/[A-Z]/);
  if (secondHalfStart === -1) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  let firstHalf = input.slice(0, secondHalfStart);
  let secondHalf = input.slice(secondHalfStart);

  firstHalf =
    firstHalf.charAt(0).toUpperCase() + firstHalf.slice(1).toLowerCase();
  secondHalf =
    secondHalf.charAt(0).toUpperCase() + secondHalf.slice(1).toLowerCase();

  return `${firstHalf} ${secondHalf}`;
}
