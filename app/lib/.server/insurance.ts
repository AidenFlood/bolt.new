import { streamText } from './llm/stream-text';

export type ClaimStatus = 'submitted' | 'in_transit' | 'rejected' | 'accepted' | 'appealed';

const claims = new Map<string, ClaimStatus>();

export async function generateSuperbill(visitDetails: string, env: Env): Promise<string> {
  const result = await streamText(
    [
      {
        role: 'user',
        content: `Create a detailed medical superbill for the following therapy visit information. Respond only with the document.\n${visitDetails}`,
      },
    ],
    env,
  );

  return result.text;
}

export async function submitSuperbill(superbill: string, env: Env): Promise<{ claimId: string; status: ClaimStatus }> {
  const claimId = crypto.randomUUID();
  // Placeholder for integration with clearing house APIs
  claims.set(claimId, 'submitted');
  return { claimId, status: 'submitted' };
}

export function getClaimStatus(claimId: string): ClaimStatus | null {
  return claims.get(claimId) ?? null;
}

export function updateClaimStatus(claimId: string, status: ClaimStatus) {
  claims.set(claimId, status);
}

export function predictClaimReturn(pastReturns: number[]): number {
  if (pastReturns.length === 0) return 0;
  const total = pastReturns.reduce((sum, val) => sum + val, 0);
  return Math.round(total / pastReturns.length);
}

export async function translateInsuranceJargon(text: string, env: Env): Promise<string> {
  const result = await streamText(
    [
      {
        role: 'user',
        content: `Explain the following insurance text in everyday language.\n${text}`,
      },
    ],
    env,
  );

  return result.text;
}

export async function generateAppealLetter(details: string, env: Env): Promise<string> {
  const result = await streamText(
    [
      {
        role: 'user',
        content: `Write a short appeal letter for a denied claim with these details.\n${details}`,
      },
    ],
    env,
  );

  return result.text;
}
