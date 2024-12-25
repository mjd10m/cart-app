
function convertDate(date) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-us',{year:"numeric", month:"2-digit", day:"2-digit",timeZone: "UTC"})
}

const capitalizeWords = (str) => {
  if(!str) return ""
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
const calcPrice = (value, type, setTotalPrice) => {
  let newPrice
  switch (type) {
    case 'dealer':
      if (value === "newPlate") {
        newPrice = '556.85'
      } else if (value === "plateTransfer") {
        newPrice = '356.85'
      } else if (value === "specPlate") {
        newPrice = '586.85'
      } else if (value === "perPlate") {
        newPrice = '616.85'
      } else if (value === "perSpecPlate") {
        newPrice = '646.85'
      } else {
        newPrice = '556.85'
      }
      setTotalPrice(newPrice)
      break;
    case 'indv':
      if (value === "newPlate") {
        newPrice = '828.35'
      } else if (value === "plateTransfer") {
        newPrice = '628.35'
      } else if (value === "specPlate") {
        newPrice = '858.35'
      } else if (value === "perPlate") {
        newPrice = '888.35'
      } else if (value === "perSpecPlate") {
        newPrice = '923.35'
      } else {
        newPrice = '828.35'
      }
      setTotalPrice(newPrice)
      break;
  }
  
}

export {convertDate, capitalizeWords, calcPrice}