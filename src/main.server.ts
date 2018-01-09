import {enableProdMode} from '@angular/core';
import {ngExpressEngine} from '@nguniversal/express-engine';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import * as express from 'express';
import {Request, Response} from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import {ServerAppModule} from './app/server-app.module';

const app = express();
const port = 8080;

function engines() {
  app.engine('html', ngExpressEngine({
    bootstrap: ServerAppModule,
  }));
  app.set('view engine', 'html');
  app.set('views', 'src');
}

function middlewares() {
  app.use(compression());
  app.use('/', express.static('dist', {index: false}));
  app.use(bodyParser.json());
  app.use(cookieParser());
}

function routes() {
  app.get('/*', (req: Request, res: Response) => {
    res.render('../dist/index', {
      req,
      res
    });
  });
}

function listen() {
  app.listen(process.env.PORT || port, () => {
    console.log(`Listening at port ${port}`);
  });

  process.on('uncaughtException', function (error) {
    console.log(error.stack);
  });
}

enableProdMode();
engines();
middlewares();
routes();
listen();
