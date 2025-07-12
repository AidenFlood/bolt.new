import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getClaimStatus } from '~/lib/.server/insurance';

export async function loader({ params }: LoaderFunctionArgs) {
  const status = getClaimStatus(params.id!);
  return json({ status });
}
