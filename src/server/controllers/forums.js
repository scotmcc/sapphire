import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
  console.log('POST /forums', req.body);
  res.send({
    router: 'forums',
    path: '/'
  });
  res.end();
});

router.post('/', function(req, res) {
  console.log('POST /forums', req.body);
  res.send({
    router: 'forums',
    path: '/'
  });
  res.end();
});

export default router;
