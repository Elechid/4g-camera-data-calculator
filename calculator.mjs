export function estimate(liveStream, uploads, cameras, days, extra) {
  const validStream = ([minutes, mbps]) =>
    Number.isFinite(minutes) && minutes >= 0 && minutes <= 1440 &&
    Number.isFinite(mbps) && mbps > 0 && mbps <= 100;
  if (![liveStream, uploads].every(validStream) ||
      !Number.isInteger(cameras) || cameras < 1 || cameras > 100 ||
      !Number.isInteger(days) || days < 1 || days > 366 ||
      !Number.isFinite(extra) || extra < 0 || extra > 100) {
    throw new RangeError('Invalid data usage inputs');
  }
  const gb = ([minutes, mbps]) => minutes * mbps * 60 * cameras * days / 8000;
  const live = gb(liveStream);
  const upload = gb(uploads);
  const total = live + upload;
  return { live, upload, total, plan: total * (1 + extra / 100) };
}
