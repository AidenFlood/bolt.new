import { json, type ActionFunctionArgs } from '@remix-run/cloudflare';
import {
  generateSuperbill,
  submitSuperbill,
  predictClaimReturn,
} from '~/lib/.server/insurance';

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.cloudflare.env;
  const { visitDetails, pastReturns = [] } = await request.json<{
    visitDetails: string;
    pastReturns?: number[];
  }>();

  const superbill = await generateSuperbill(visitDetails, env);
  const { claimId, status } = await submitSuperbill(superbill, env);
  const predictedReturn = predictClaimReturn(pastReturns);

  return json({ claimId, status, predictedReturn, superbill });
}
