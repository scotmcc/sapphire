import { EventEmitter } from 'events';
import mongoose from 'mongoose';

class Database extends EventEmitter {
  constructor(server) {
    super();
    Object.defineProperty(this, 'server', { value: server });
  }
  start() {
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
    Object.defineProperty(this, 'connection', { value: mongoose.connection });
    this.connection.on(
      'error',
      console.error.bind(console, 'connection error:')
    );
    this.connection.once('open', () => {
      this.emit('started', this);
    });
  }
}

export default function(server) {
  return new Database(server);
}
