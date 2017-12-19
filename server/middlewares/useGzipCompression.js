import compression from 'compression';

function useGzipCompression() {
  return compression();
}

export default useGzipCompression;
