import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
  console.log('POST /news', req.body);
  res.send({
    router: 'news',
    path: '/'
  });
  res.end();
});

router.post('/', function(req, res) {
  console.log('POST /news', req.body);
  res.send({
    router: 'news',
    path: '/'
  });
  res.end();
});

export default router;
