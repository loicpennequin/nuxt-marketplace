import { CompatibilityEvent, callHandler } from 'h3';
import { uploadImage } from '../trpc/services/file-upload';

export default async (event: CompatibilityEvent) => {
  try {
    const handler = uploadImage()();
    // @ts-ignore
    const result = await callHandler(handler, event.req, event.res);
    console.log(result, event.req.file);
    // @ts-ignore
    return { success: true };
  } catch (e: any) {
    return { success: false, reason: e.message };
  }
};
