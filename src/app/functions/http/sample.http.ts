import express from 'express';
import * as functions from 'express-firebees';

export const sample = functions.http.onRequest(
  (req: express.Request, res: express.Response) => {
    // Here Function code
    return res.status(200).send('Function done: ' + req.method);
  }
);
