import { DbConnection } from "./DbConnectionInterface";
import { AuthUser } from "./authUserInterface";
import { DataLoaders } from "./dataLoadersInterface";

export interface ResolverContext {

    db?: DbConnection;
    authorization?: string;
    authUser?: AuthUser;
    dataloaders?: DataLoaders
}