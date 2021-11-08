import mongoose from 'mongoose';

import mongoConfig from '@config/mongo';

export default mongoose.connect(
  `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
