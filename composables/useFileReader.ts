export const useFileReader = () => {
  if (import.meta.env.SSR) {
    return {
      readAsArrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      readAsBinaryString: () => Promise.resolve(''),
      readAsDataURL: () => Promise.resolve(''),
      readAsText: () => Promise.resolve('')
    };
  }

  const reader = new FileReader();

  type FileReaderMethod =
    | 'readAsArrayBuffer'
    | 'readAsBinaryString'
    | 'readAsDataURL'
    | 'readAsText';

  const readAsync =
    <T>(method: FileReaderMethod) =>
    (file: Blob): Promise<T> =>
      new Promise((resolve, reject) => {
        reader[method](file);
        reader.onload = () => resolve(reader.result as T);
        reader.onerror = () => reject(reader.error);
      });

  const readAsArrayBuffer = readAsync<ArrayBuffer>('readAsArrayBuffer');
  const readAsBinaryString = readAsync<string>('readAsBinaryString');
  const readAsDataURL = readAsync<string>('readAsDataURL');
  const readAsText = readAsync<string>('readAsText');

  return {
    readAsArrayBuffer,
    readAsBinaryString,
    readAsDataURL,
    readAsText
  };
};
