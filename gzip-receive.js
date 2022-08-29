import { log } from 'console'
import { createWriteStream } from 'fs'
import { createServer } from 'http'
import { basename, join } from 'path'
import { createGunzip } from 'zlib'


const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename'])
    const destFilename = join('received_files', filename)
    log(`File request received: ${filename}`)
    req.pipe(createGunzip())
        .pipe(createWriteStream(destFilename))
        .on('finish', () => {
            res.writeHead(201, { 'Content-Type': 'text/plain' })
            res.end('OK\n')
            log(`File saved: ${destFilename}`)
        })
})


server.listen(3000, () => { console.log('Listening on http://localhost:3000') })