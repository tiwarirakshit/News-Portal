import app from './app';

const port = Number(process.env.PORT);


const start = (Port: number) => {
  try {
    app.listen(Port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${Port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

start(port);

