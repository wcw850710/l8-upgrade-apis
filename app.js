const fastify = require('fastify')({ logger: true })
const { appConfig } = require('./config')

const PORT = appConfig[process.env.NODE_ENV].PORT

fastify.register(require('fastify-cors'), {
	origin: (origin, cb) => {
		console.log('-------------------------------------------')
		console.log(origin)
		console.log('-------------------------------------------')
		if (/localhost/.test(origin)) {
			//  Request from localhost will pass
			cb(null, true)
			return
		}
		// Generate an error on other origins, disabling access
		cb(new Error('Not allowed'))
	},
})

// Declare a route
fastify.get('/', async (request, reply) => {
	return { hello: 'world' }
})

// Run the server!
const start = async () => {
	try {
		await fastify.listen(PORT)
		console.log(`Server is running in http://localhost:${PORT}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
