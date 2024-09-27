import { input, number } from  '@inquirer/prompts'
import { main } from './banking_system.js'

export async function mainQuestion () {

    console.log(`
        Selamat datang di Bank ABC. Silahkan pilih menu yang tersedia:
        1. Deposit
        2. Withdraw
        3. Lihat Saldo
        4. Keluar
    `)
    const choice  = await number(
        {
            message: 'Masukkan pilih anda:',
            required: true
        }
    )
    return choice
}

export async function loopQuestion(){
    const choice = await input({
        message: 'Apakah anda ingin melakukan transaksi lainnya? (y/n)',
        required: true
    })

    if(choice.toLowerCase() === 'y'){
       main()
       return;
    }

    console.log('Terima kasih telah menggunakan layanan kami')
    process.exit(0)
}
