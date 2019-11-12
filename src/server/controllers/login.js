import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
  console.log('GET /login', req.body);
  res.send({
    router: 'login',
    path: '/'
  });
  res.end();
});

router.post('/', function(req, res) {
  console.log('POST /login', req.body);
  res.send({
    router: 'login',
    path: '/'
  });
  res.end();
});

export default router;
