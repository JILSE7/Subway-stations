import { createHash } from 'crypto';

const generateHashIdStations = (
  subwayFamily: string,
  line: string,
  stationName: string,
) => {
  const data = subwayFamily + line + stationName;
  const hash = createHash('sha256').update(data).digest('hex');
  return hash;
};

const generateHashIdLine = (subwayFamily: string, line: string) => {
  const data = subwayFamily + line;
  const hash = createHash('sha256').update(data).digest('hex');
  return hash;
};

export const HashUtilities = {
  generateHashIdLine,
  generateHashIdStations,
};
