import { CompatibilityEvent, callHandler } from 'h3';
import { uploadImageMiddleware } from '../trpc/services/file-upload';

type RequestWithFile = CompatibilityEvent['req'] & { file: any };
export default async (event: CompatibilityEvent) => {
  const handler = uploadImageMiddleware();

  // @ts-ignore
  await callHandler(handler, event.req, event.res);

  return { url: (event.req as RequestWithFile).file.path };
};
