import { DbConnection } from "./DbConnectionInterface";
import { AuthUser } from "./authUserInterface";
import { DataLoaders } from "./dataLoadersInterface";
import { RequestedFields } from "../graphql/ast/requestedFields";

export interface ResolverContext {

    db?: DbConnection;
    authorization?: string;
    authUser?: AuthUser;
    dataloaders?: DataLoaders;
    requestedFields?: RequestedFields;
}