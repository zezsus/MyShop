/** @format */

export const validateSchemas = async (schemas: any, data: any) => {
  try {
    return schemas.validate(data);
  } catch (error) {
    throw error;
  }
};
