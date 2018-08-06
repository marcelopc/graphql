import { ModelsInterface } from "./modelsInterface";

export interface BaseModelInterface {

    prototype?;
    associate?(models: ModelsInterface): void;
}