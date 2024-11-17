import { prisma } from "../db.js";
import { generateBankAccountNumber } from "../helper.js";

async function seed() {
    const user = await prisma.users.create({
        data: {
        email: "test@gmail.com",
        password: "password",
        name: "Test",
}
});

await prisma.bankAccounts.create({
    data: {
    balance: 1000000,
    userId: user.id,
    bankName: "Bank Central Asia",
    bankAccountNumber: generateBankAccountNumber()
}
});

}

seed().catch((error) => {
    process.exit(1);
});