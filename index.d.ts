import * as Joi from 'joi'
import { Schema ,ValidationOptions } from 'joi'
declare module 'egg' {

  export interface Application {
    joi: typeof Joi
  }
  export interface Context {
    validate(schema: Schema, options?: ValidationOptions ): void
  }
  export interface EggAppConfig {
    joi : {
        options: ValidationOptions,
    }
  }
}