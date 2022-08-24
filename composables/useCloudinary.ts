import { Cloudinary } from 'cloudinary-core';

export const useCloudinary = () => {
  const config = useRuntimeConfig();
  const cl = new Cloudinary({
    cloud_name: config.public.cloudinaryId,
    secure: true
  });

  return cl;
};
