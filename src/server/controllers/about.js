import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
  res.send({
    router: 'about',
    path: '/'
  });
  res.end();
});

router.post('/', function(req, res) {
  res.send({
    router: 'about',
    path: '/'
  });
  res.end();
});

export default router;
