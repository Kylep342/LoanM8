const reduceInterestValues = (
    accumulator: number,
    currentValue: number,
    index: number,
    initialValue: number
): number => accumulator + currentValue;

export const apportionInterest = (
    principal: number,
    interestRate: number,
    beginRepaymentDate: Date,
    disbursementDates: Date[]
): number => {
    return disbursementDates.map(
        disbursementDate => {
            return (
                (1 / disbursementDates.length) *
                principal *
                (interestRate / 36525) *
                Math.round(
                    (
                        beginRepaymentDate.valueOf() -
                        disbursementDate.valueOf()
                    ) / 86400000
                )
            )
        }
    ).reduce(reduceInterestValues)
}