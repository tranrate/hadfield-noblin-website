import Static from '@fastify/static'
import path from 'path';

export default async function uiSrc (fastify, opts) {
  await fastify.register(Static, {
    root: path.join(import.meta.dirname, '..', 'ui', 'src'),
    prefix: '/src'
  })
}