import * as Joi from 'joi'
import { SchemaLike ,ValidationOptions } from 'joi'
declare module 'egg' {
   interface SchemaRule {
        header?:SchemaLike,
        query?: SchemaLike,
        body?: SchemaLike,
        params?:SchemaLike,
   }
  export interface Application {
    joi: typeof Joi
  }
  export interface Context {
    joiValidate(schema: SchemaRule, options?: ValidationOptions ): void
  }
  export interface EggAppConfig {
    joi : {
        options: ValidationOptions,
    }
  }
}