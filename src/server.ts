import { app } from './app'
import { env } from './env'

const app = express()

app.use(express.json())

app.use(routes)

app.listen(env.PORT, () => console.log('👨‍🚀 server is running'))
