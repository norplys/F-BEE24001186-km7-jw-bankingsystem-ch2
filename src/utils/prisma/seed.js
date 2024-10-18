import { prisma } from "../db.js";
import { generateBankAccountNumber } from "../helper.js";

async function seed() {
    const user = await prisma.user.create({
        data: {
        email: "test@gmail.com",
        password: "password",
        name: "Test",
        profile: {
            create: {
            identityType: "KTP",
            identityNumber: "1234567890",
            address: "Jl. Jalan No. 1"
        }
    }
}
});

await prisma.bankAccount.create({
    data: {
    balance: 1000000,
    userId: user.id,
    bankName: "Bank Central Asia",
    bankAccountNumber: generateBankAccountNumber()
}
});

}

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});