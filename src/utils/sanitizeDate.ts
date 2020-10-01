/**
*
* Function to convert string format of a date
* Arguments:
*   dateString  [string]: calendar date in the form YYYY-MM-DD
* Returns:
*   dateString  [string]: calendar date in the form MM/DD/YYYY
*
*/
export const sanitizeDate = (dateString: string) => {
    const dateRE = /(\d{4})-(\d{2})-(\d{2})/gm
    const match = dateRE.exec(dateString)
    if (match) {
        return `${match[2]}/${match[3]}/${match[1]}`
    }
    return null
}
