import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

// omp (oh-my-pi) extension for Proviso.
//
// Skills are registered through omp's package-capability discovery: this
// repository's package.json declares `omp.extensions`, and when the package is
// loaded (extensions: path, --extension, or a plugin install) omp discovers
// the sibling `skills/` directory automatically. Unlike Pi, omp's
// `resources_discover` event currently has no runtime callsites, so this
// extension only handles bootstrap injection.

const EXTREMELY_IMPORTANT_MARKER = "<EXTREMELY_IMPORTANT>";
const BOOTSTRAP_MARKER = "proviso:using-proviso bootstrap for omp";

const extensionDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(extensionDir, "../..");
const skillsDir = resolve(packageRoot, "skills");
const bootstrapSkillPath = resolve(skillsDir, "using-proviso", "SKILL.md");

let cachedBootstrap: string | null | undefined;

export default function provisoOmpExtension(pi: ExtensionAPI) {
	let injectBootstrap = true;

	pi.on("session_start", async () => {
		injectBootstrap = true;
	});

	pi.on("session_compact", async () => {
		injectBootstrap = true;
	});

	pi.on("agent_end", async () => {
		injectBootstrap = false;
	});

	pi.on("context", async (event) => {
		if (!injectBootstrap) return;
		if (event.messages.some(messageContainsBootstrap)) return;

		const bootstrap = getBootstrapContent();
		if (!bootstrap) return;

		const bootstrapMessage = {
			role: "user" as const,
			content: [{ type: "text" as const, text: bootstrap }],
			timestamp: Date.now(),
		};

		const insertAt = firstNonCompactionSummaryIndex(event.messages);
		return {
			messages: [
				...event.messages.slice(0, insertAt),
				bootstrapMessage,
				...event.messages.slice(insertAt),
			],
		};
	});
}

function getBootstrapContent(): string | null {
	if (cachedBootstrap !== undefined) return cachedBootstrap;

	try {
		const skillContent = readFileSync(bootstrapSkillPath, "utf8");
		const body = stripFrontmatter(skillContent);
		cachedBootstrap = `${EXTREMELY_IMPORTANT_MARKER}
${BOOTSTRAP_MARKER}

You have Proviso.

The using-proviso skill content is included below and is already loaded for this omp session. Follow it now. Do not try to load using-proviso again.

${body}

${ompToolMapping()}
</EXTREMELY_IMPORTANT>`;
		return cachedBootstrap;
	} catch {
		cachedBootstrap = null;
		return null;
	}
}

function stripFrontmatter(content: string): string {
	const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
	return (match ? match[1] : content).trim();
}

function ompToolMapping(): string {
	return `## omp tool mapping

When a Proviso instruction says to invoke a skill, use omp's native skill system (skills are discovered from this package's \`skills/\` directory; \`skill://\` paths resolve in any FS-shaped tool).

omp's built-in tools are lowercase and include: \`read\`, \`write\`, \`edit\` (hashline), \`ast_edit\`, \`grep\`, \`glob\`, \`bash\`, \`eval\`, plus \`task\` (fan out subagents in parallel), \`wait\`, \`todo\` (session task list), \`ask\` (structured questions), \`web_search\`, and \`github\`.

- Dispatch a subagent → \`task\` (parallel fan-out; collect with \`wait\` or read results from the agent hub)
- Track tasks / todos → \`todo\`
- Ask the user → \`ask\`
- Search the web → \`web_search\`
- Read a URL or PDF → \`read\` (URLs and arxiv PDFs resolve through the same \`read\`)`;
}

function messageContainsBootstrap(message: unknown): boolean {
	const content = (message as { content?: unknown }).content;
	if (typeof content === "string") return content.includes(BOOTSTRAP_MARKER);
	if (!Array.isArray(content)) return false;
	return content.some((part) => {
		return (
			part &&
			typeof part === "object" &&
			(part as { type?: unknown }).type === "text" &&
			typeof (part as { text?: unknown }).text === "string" &&
			(part as { text: string }).text.includes(BOOTSTRAP_MARKER)
		);
	});
}

function firstNonCompactionSummaryIndex(messages: unknown[]): number {
	let index = 0;
	while ((messages[index] as { role?: unknown } | undefined)?.role === "compactionSummary") {
		index += 1;
	}
	return index;
}
