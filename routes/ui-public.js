import Static from '@fastify/static'
import path from 'path'

export default async function uiPublic (fastify, opts) {
  await fastify.register(Static, {
    root: path.join(import.meta.dirname, '..', 'ui', 'public'),
    prefix: '/public'
  })
  
    // A single route that serves the index.html file,
  // `fastify-static` will take care of the rest.
  fastify.route({
    method: 'GET',
    path: '/',
    handler: onBundle
  })

  function onBundle (req, reply) {
    // `.sendFile` is a decorator added by `fastify-static`
    reply.sendFile('index.html')
  }
}