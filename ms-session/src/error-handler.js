import logger from './logger'

export function handleError(err) {
  logger.error({ err })
  process.exit(-1)
}

export function handleRequestError(req, err) {
  logger.error({
    method:req.method,
    path: req.path,
    err,
  })
  process.exit(-1)
}
