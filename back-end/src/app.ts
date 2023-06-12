import express from 'express'
import UserRoute from './routes/users-routes'
import PostRoute from './routes/post-routes'
// import  {Token} from './midllewares/auth.midlleware'

class App {
  public app: express.Express

  constructor() {
    this.app = express()

    this.config()

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }))
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      )
      res.header('Access-Control-Allow-Headers', '*')
      next()
    }
    this.app.use(express.json())
    this.app.use(accessControl)
    this.app.use('/', UserRoute)
    this.app.use('/', UserRoute)
    this.app.use('/', PostRoute)
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
  }
}

export default App
