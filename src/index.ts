interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * rss2json MCP.
 */


const BASE = 'https://api.rss2json.com/v1/api.json';
const UA = 'pipeworx-mcp-rss2json/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'feed',
    description: 'Fetch RSS/Atom feed as JSON.',
    inputSchema: {
      type: 'object',
      properties: {
        rss_url: { type: 'string' },
        count: { type: 'number' },
        api_key: { type: 'string', description: 'Optional free rss2json API key for higher limits.' },
      },
      required: ['rss_url'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  if (name !== 'feed') throw new Error(`Unknown tool: ${name}`);
  const url = args.rss_url;
  if (typeof url !== 'string' || !url.trim()) throw new Error('Required argument "rss_url" is missing. Pass a string like "https://news.ycombinator.com/rss".');
  const p = new URLSearchParams({ rss_url: url });
  if (args.api_key) p.set('api_key', String(args.api_key));
  if (args.count != null) {
    if (!args.api_key) throw new Error('rss2json: `count` requires an api_key (free at https://rss2json.com/sign-up). Omit `count` for keyless use.');
    p.set('count', String(args.count));
  }
  const res = await fetch(`${BASE}?${p}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (!res.ok) throw new Error(`rss2json: ${res.status}`);
  return res.json();
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
