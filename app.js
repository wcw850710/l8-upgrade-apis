require('./src/database/init-mongodb').then(({ db, models }) => {
	const { appConfig } = require('./config')
	const fastify = require('fastify')({ logger: false })

	const PORT = appConfig[process.env.NODE_ENV].PORT

	fastify.register(require('fastify-cors'), {})

	// Declare a route
	fastify.get('/', async (request, reply) => {
		const felyne = new models.Kitten({
			name: 'Felyne' + Math.floor(Math.random() * 100),
		})

		try {
			await felyne.save()
		} catch (error) {
			return {
				saveError: error,
				success: false
			}
		}

		return {
			success: true
		}
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
})
