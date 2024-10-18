class UsersService {
    static async createUser(data) {
        return prisma.user.create({
            data,
        });
    }
}