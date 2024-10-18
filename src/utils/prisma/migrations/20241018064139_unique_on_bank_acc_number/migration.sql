/*
  Warnings:

  - A unique constraint covering the columns `[bank_account_number]` on the table `bank_account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bank_account_bank_account_number_key" ON "bank_account"("bank_account_number");
