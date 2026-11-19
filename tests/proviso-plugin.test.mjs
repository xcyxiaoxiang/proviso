// Smoke tests for the Proviso OpenCode plugin (V1 + V2 compatibility).
// Zero dependencies — run with the built-in runner: npm test (node --test tests/)

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import proviso, { ProvisoPlugin, V1_MAPPING, V2_MAPPING } from '../.opencode/plugins/proviso.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Mock V2 context: records skill registrations and captures session hooks.
const makeV2Context = ({ parentID } = {}) => {
  const registered = [];
  const hooks = {};
  const ctx = {
    skill: {
      transform: async (fn) => {
        await fn({
          list: () => registered,
          add: (skill) => registered.push(skill),
          update: () => {},
          remove: () => {},
        });
      },
    },
    session: {
      hook: async (name, cb) => {
        hooks[name] = cb;
      },
      get: async ({ sessionID }) => (parentID ? { id: sessionID, parentID } : { id: sessionID }),
    },
  };
  return { ctx, registered, hooks };
};

const freshMessages = () => [{ role: 'user', content: [{ type: 'text', text: 'hello' }] }];

test('V2 setup registers every skill with id, name, path and content', async () => {
  const { ctx, registered } = makeV2Context();
  await proviso.setup(ctx);

  assert.equal(registered.length, 8, 'expected 8 skills registered');

  for (const skill of registered) {
    assert.ok(skill.id, 'skill id missing');
    assert.ok(skill.name, 'skill name missing');
    assert.ok(skill.path.endsWith('SKILL.md'), `skill path missing for ${skill.id}`);
    assert.ok(skill.content.length > 0, `skill content empty for ${skill.id}`);
    assert.ok(!skill.content.startsWith('---'), `frontmatter not stripped for ${skill.id}`);
  }

  const ids = registered.map((skill) => skill.id).sort();
  assert.deepEqual(ids, [
    'debugging',
    'designing',
    'implementing',
    'requirements',
    'test-driven-development',
    'using-git-worktrees',
    'using-proviso',
    'verifying',
  ].sort());
});

test('V2 bootstrap injects into the first user message of a top-level session', async () => {
  const { ctx, hooks } = makeV2Context();
  await proviso.setup(ctx);
  assert.ok(hooks.context, 'context hook was not registered');

  const messages = freshMessages();
  await hooks.context({ messages, sessionID: 'ses_top' });

  const text = messages[0].content[0].text;
  assert.ok(text.includes('EXTREMELY_IMPORTANT'), 'bootstrap marker missing');
  assert.ok(text.includes('## Coding Discipline'), 'Coding Discipline section missing');
  assert.ok(text.includes('Tool Mapping'), 'tool mapping missing');
  assert.equal(messages[0].content.length, 2, 'original user text must stay after the bootstrap');
});

test('V2 bootstrap is skipped for child sessions', async () => {
  const { ctx, hooks } = makeV2Context({ parentID: 'ses_parent' });
  await proviso.setup(ctx);

  const messages = freshMessages();
  await hooks.context({ messages, sessionID: 'ses_child' });

  assert.equal(messages[0].content.length, 1, 'child session must not receive the bootstrap');
  assert.equal(messages[0].content[0].text, 'hello');
});

test('V2 bootstrap is not injected twice', async () => {
  const { ctx, hooks } = makeV2Context();
  await proviso.setup(ctx);

  const messages = freshMessages();
  await hooks.context({ messages, sessionID: 'ses_top' });
  await hooks.context({ messages, sessionID: 'ses_top' });

  assert.equal(messages[0].content.length, 2, 'bootstrap was injected more than once');
});

test('V1 plugin registers skill paths and injects the bootstrap', async () => {
  const plugin = await ProvisoPlugin({
    client: { session: { get: async () => ({ id: 'ses_v1' }) } },
    directory: root,
  });

  const config = { skills: { paths: [] } };
  await plugin.config(config);
  assert.ok(config.skills.paths.some((p) => p.endsWith('skills')), 'skills path not registered');

  const output = {
    messages: [{ info: { role: 'user', sessionID: 'ses_v1' }, parts: [{ type: 'text', text: 'hi' }] }],
  };
  await plugin['experimental.chat.messages.transform']({}, output);

  assert.ok(output.messages[0].parts[0].text.includes('EXTREMELY_IMPORTANT'), 'V1 bootstrap missing');
  assert.equal(output.messages[0].parts.length, 2, 'original V1 part must stay after the bootstrap');
});

test('V1 and V2 tool mappings both carry the tool-mapping header', () => {
  for (const mapping of [V1_MAPPING, V2_MAPPING]) {
    assert.ok(mapping.includes('Tool Mapping for OpenCode'));
  }
});
