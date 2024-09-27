import { number } from "@inquirer/prompts";
import { BankAccount } from "./bank_account.js";
import { loopQuestion, mainQuestion } from "./question.js";
import loading from "loading-cli";

const loader = loading("Sedang memproses...");

const account = new BankAccount();

export async function main() {
  console.clear();
  try {
    const choice = await mainQuestion();
    switch (choice) {
      case 1:
        console.clear();
        const depositValue = await number({
          message: "Masukkan nominal yang akan di deposit:",
          required: true,
        });
        loader.start();
        const deposit = await account.deposit(depositValue);
        loader.stop();
        console.clear();
        console.log(deposit);
        break;
      case 2:
        console.clear();
        const withdrawValue = await number({
          message: "Masukkan nominal yang akan di withdraw:",
          required: true,
        });
        loader.start();
        const withdraw =  await account.withdraw(withdrawValue)
        loader.stop();
        console.clear();
        console.log(withdraw);
        break;
      case 3:
        console.clear();
        loader.start();
        const saldo = await account.getSaldo();
        loader.stop();
        console.clear();
        console.log(`Saldo anda saat ini: ${saldo}`);
        break;
      case 4:
        console.clear();
        console.log("Terima kasih telah menggunakan layanan kami");
        process.exit(0);
      default:
        console.clear();
        console.log("Pilihan tidak valid");
        break;
    }

    await loopQuestion();
  } catch (err) {
    console.clear();
    loader.stop();
    if (err instanceof Error) {
      console.log(err.message);
      await loopQuestion();
      return;
    }

    console.log(err);

    await loopQuestion();
  }
}

main();
