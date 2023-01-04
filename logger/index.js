
import {AppLogger} from './Logger.js';

let logger=null;

if (process.env.NODE_ENV === 'production') {
    logger=AppLogger();
}
logger=AppLogger();

export {logger};
