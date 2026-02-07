import { OpenAPIHono } from '@hono/zod-openapi'


const pkg = require('../package.json') as { 
    name: string
    version: string
}

export default function createApp() {
    const app = new OpenAPIHono({
        strict: false,
    })

    app.doc('/docs', {
        openapi: "3.0.0",
        info: {
            title: pkg.name,
            version: pkg.version,
        },
    })
    return app;
}