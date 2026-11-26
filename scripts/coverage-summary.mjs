#!/usr/bin/env node
/**
 * Renders the Jest coverage summary as a Markdown table inside the GitHub
 * Actions job summary ($GITHUB_STEP_SUMMARY). Falls back to stdout locally.
 */

import { readFileSync, appendFileSync, existsSync } from 'node:fs'

const FILE = 'coverage/coverage-summary.json'

if (!existsSync(FILE)) {
  console.log('No coverage/coverage-summary.json found — skipping summary.')
  process.exit(0)
}

const { total, ...files } = JSON.parse(readFileSync(FILE, 'utf8'))
const metric = (m) => `${m.pct.toFixed(1)}%`

const rows = [
  ['**Total**', metric(total.statements), metric(total.branches), metric(total.functions), metric(total.lines)],
  ...Object.entries(files).map(([path, data]) => [
    `\`${path.replace(`${process.cwd()}/`, '')}\``,
    metric(data.statements),
    metric(data.branches),
    metric(data.functions),
    metric(data.lines),
  ]),
]

const table = [
  '| File | Statements | Branches | Functions | Lines |',
  '| --- | --- | --- | --- | --- |',
  ...rows.map((r) => `| ${r.join(' | ')} |`),
].join('\n')

const output = `\n### Test coverage\n\n${table}\n`

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, output)
}
console.log(output)
