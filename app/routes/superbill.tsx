import { Form, useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return { claimId: null };
};

export default function Superbill() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Therapy Superbill Generator</h1>
      <Form method="post" action="/api/claims" className="space-y-2">
        <textarea
          name="visitDetails"
          placeholder="Describe the patient's visit"
          className="w-full border p-2"
          rows={6}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate & Submit
        </button>
      </Form>
      {data.claimId && <p>Claim submitted with ID: {data.claimId}</p>}
    </div>
  );
}
