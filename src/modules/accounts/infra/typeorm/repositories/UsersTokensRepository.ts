import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({ expires_date, user_id, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            user_id,
            refresh_token
        });
        await this.repository.save(userToken);
        return userToken;
    }
}

export { UsersTokensRepository }