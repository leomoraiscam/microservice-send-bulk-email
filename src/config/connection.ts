import mongoose from 'mongoose';

import mongoConfig from './mongo';

mongoose.connect(
  `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
