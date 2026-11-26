#!/usr/bin/env node
/**
 * Post-deploy smoke test.
 *
 * Boots the production build (`next start`) on a spare port, waits for it to
 * answer, then asserts that every public route returns 200 and that the
 * landing page still renders its headline. Exits non-zero on any failure so
 * the CI/CD job fails (and the CD workflow rolls back).
 *
 * Usage:
 *   node scripts/smoke-test.mjs                     # boots the app itself
 *   BASE_URL=https://foodshare.vercel.app node scripts/smoke-test.mjs
 *                                                   # checks a live deployment
 */

import { spawn } from 'node:child_process'
import process from 'node:process'

const PORT = process.env.SMOKE_PORT || '3111'
const EXTERNAL = Boolean(process.env.BASE_URL)
const BASE_URL = process.env.BASE_URL || `http://127.0.0.1:${PORT}`
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT || 60_000)

const ROUTES = [
  { path: '/', expect: 'FoodShare' },
  { path: '/auth', expect: null },
  { path: '/donate', expect: null },
  { path: '/donor', expect: null },
  { path: '/ngo', expect: null },
  { path: '/donation/1', expect: null },
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForServer(deadline) {
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE_URL}/`, { redirect: 'follow' })
      if (res.ok) return true
    } catch {
      // server not up yet
    }
    await sleep(1000)
  }
  return false
}

async function checkRoutes() {
  const failures = []
  for (const route of ROUTES) {
    const res = await fetch(`${BASE_URL}${route.path}`, { redirect: 'follow' })
    const body = await res.text()
    if (res.status !== 200) {
      failures.push(`${route.path} -> HTTP ${res.status}`)
      continue
    }
    if (route.expect && !body.includes(route.expect)) {
      failures.push(`${route.path} -> 200 but missing "${route.expect}"`)
      continue
    }
    console.log(`  PASS  ${route.path}  (200)`)
  }
  return failures
}

let server = null

function startServer() {
  const child = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'start', '-p', PORT],
    { stdio: ['ignore', 'inherit', 'inherit'], env: { ...process.env, NODE_ENV: 'production' } }
  )
  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`server exited early with code ${code}`)
      process.exit(1)
    }
  })
  return child
}

async function main() {
  console.log(`Smoke testing ${BASE_URL} (${EXTERNAL ? 'external' : 'local build'})`)

  if (!EXTERNAL) {
    server = startServer()
  }

  const up = await waitForServer(Date.now() + TIMEOUT_MS)
  if (!up) {
    console.error(`Server did not become ready within ${TIMEOUT_MS}ms`)
    process.exit(1)
  }

  const failures = await checkRoutes()

  if (failures.length) {
    console.error('\nSmoke test FAILED:')
    failures.forEach((f) => console.error(`  FAIL  ${f}`))
    process.exit(1)
  }

  console.log('\nAll smoke checks passed.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    if (server) server.kill('SIGTERM')
  })
