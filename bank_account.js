export class BankAccount {
    constructor() {
      this.saldo = 0;
    }


    // Add your saldo, if value is negative, reject with message "Angka harus positif"
    deposit(value) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value < 0) {
            reject("Angka harus positif");
          } else {
            this.saldo += value;
            resolve(`Saldo berhasil ditambahkan, Saldo sekarang: ${this.saldo}`);
          }
        }, 3000);
      });
    }
    
    // Withdraw your saldo, if value is negative, reject with message "Angka harus positif"
    withdraw(value) {
      return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value < 0) {
          reject("Angka harus positif");
        } else if (this.saldo < value) {
          reject("Saldo tidak cukup");
        } else {
          this.saldo -= value;
          resolve(`Saldo berhasil dikurangi, Saldo sekarang: ${this.saldo}`);
        }
      }, 3000);
      });
    }

    getSaldo(){
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve(`Saldo anda saat ini: ${this.saldo}`);
        }, 3000);
      });
    }
  }

  
