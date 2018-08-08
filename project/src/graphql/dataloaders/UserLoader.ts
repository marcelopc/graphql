import { UserModel, UserInstance } from "../../models/UserModel";
import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/requestedFields";

export class UserLoader {

    static batchUsers(User: UserModel, params: DataLoaderParam<number>[], requestedFilds: RequestedFields): Promise<UserInstance[]> {

        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            User.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFilds.getFields(params[0].info, {keep:['id'], exclude:['posts']})
                })
        );
    }
}