# @pipeworx/rss2json

[rss2json.com](https://rss2json.com/docs) MCP — keyless RSS/Atom → JSON converter (10k req/day free).

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `feed(rss_url, count?, api_key?)` — fetch an RSS/Atom feed as JSON (api_key optional, raises limits if provided)

## Notes

Falls under "keyless" but the upstream raises rate limits when you supply your own free API key (sign up at rss2json.com). Pass it via `api_key`.

## Data source

`https://api.rss2json.com/v1/api.json`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "rss2json": {
      "url": "https://gateway.pipeworx.io/rss2json/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Rss2json data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
