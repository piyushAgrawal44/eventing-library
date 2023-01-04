import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ message, timestamp }) => {
  return `${message} --> ${timestamp}`;
});

export const AppLogger = ()=>{
  return createLogger({
    level: 'info',
    format: combine(
      timestamp({format: "HH:mm:ss YY-mm-dd"}),
      myFormat
    ),
    transports: [
      new transports.File({ filename: 'app.log' }),
    ],
  });
}