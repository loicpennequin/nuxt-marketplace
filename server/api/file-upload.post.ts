import { CompatibilityEvent, callHandler } from 'h3';
import { uploadImage } from '../trpc/services/file-upload';

type RequestWithFile = CompatibilityEvent['req'] & { file: any };
export default async (event: CompatibilityEvent) => {
  const handler = uploadImage()();

  // @ts-ignore
  await callHandler(handler, event.req, event.res);

  return { url: (event.req as RequestWithFile).file.path };
};
