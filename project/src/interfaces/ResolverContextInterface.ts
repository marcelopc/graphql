import { DbConnection } from "./DbConnectionInterface";
import { AuthUser } from "./authUserInterface";

export interface ResolverContext {

    db?: DbConnection;
    authorization?: string;
    authUser?: AuthUser;
}