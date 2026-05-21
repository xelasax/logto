import { z } from 'zod';

/**
 * UsageType here is used to specify the use case of the template, can be either
 * 'Register', 'SignIn', 'ForgotPassword', 'Generic', etc.
 */
const requiredTemplateUsageTypes = ['Register', 'SignIn', 'ForgotPassword', 'Generic'];

const templateGuard = z.object({
  usageType: z.string(),
  content: z.string(),
});

export const localSmsConfigGuard = z.object({
  endpoint: z.string().url(),
  method: z.enum(['GET', 'POST']).default('POST'),
  headers: z.record(z.string()).optional(),
  queryParams: z.record(z.string()).optional(),
  bodyParams: z.record(z.string()).optional(),
  bodyJson: z.record(z.string(), z.any()).optional(),
  successResponseCodes: z.array(z.number()).optional(),
  templates: z.array(templateGuard).refine(
    (templates) =>
      requiredTemplateUsageTypes.every((requiredType) =>
        templates.map((template) => template.usageType).includes(requiredType)
      ),
    (templates) => ({
      message: `Template with UsageType (${requiredTemplateUsageTypes
        .filter(
          (requiredType) => !templates.map((template) => template.usageType).includes(requiredType)
        )
        .join(', ')}) should be provided!`,
    })
  ),
});

export type LocalSmsConfig = z.infer<typeof localSmsConfigGuard>;

export type LocalSmsPayload = {
  to: string;
  message: string;
};
