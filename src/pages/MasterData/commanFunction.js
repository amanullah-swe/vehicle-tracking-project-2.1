export const convertInDDMMYYYY = (inputDate) => {
    let newDate = new Date(inputDate)
   
    let date = newDate.getDate()
    let month = newDate.getMonth()
    let year = newDate.getFullYear()
    let convertedDate = `${date < 10 ? 0 : ""}${date}-${month < 10 ? 0 : ""}${month}-${year}`
    return convertedDate
}

export const convertInYYYYMMDD = (inputsDate) => {
    let newDate = new Date(inputsDate)
    let date = newDate.getDate()
    let month = newDate.getMonth()
    let year = newDate.getFullYear()

    let convertedDate = `${year}-${month < 10 ? 0 : ""}${month}-${date < 10 ? 0 : ""}${date}`
    return convertedDate
}