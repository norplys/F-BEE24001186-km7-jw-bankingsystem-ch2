export function generateBankAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export function generateJoiErrors(error) {
   const message = error.details.map(err => err.message);
    return message;
}
