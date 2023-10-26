import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStationInput } from '../dto/create-station.input';
import { UpdateStationInput } from '../dto/update-station.input';
import { Station } from '../entities/station.entity';
import { systemSubway } from '../data/stations';
import { Line } from '../entities/line.entity';
import { SubwayFamily } from '@app/common/types/enums/line-family.enum';
import { writeFile } from 'fs/promises';
import crypto from 'node:crypto';
import { createHash } from 'crypto';
import { HashUtilities } from '@app/common/utilities/hash';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel(Station.name)
    private readonly stationModel: Model<Station>,
    @InjectModel(Line.name) private readonly lineModel: Model<Line>,
  ) {}

  create(createStationInput: CreateStationInput) {
    return 'This action adds a new station';
  }

  async findByLineFamily(subwayFamily: SubwayFamily) {
    const lines = await this.lineModel.aggregate([
      {
        $match: { subwayFamily: { $eq: subwayFamily } },
      },
      {
        $unwind: '$stations',
      },
      {
        $lookup: {
          from: 'stations',
          localField: 'stations',
          foreignField: '_id',
          as: 'stationAlone',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          d: { $first: '$name' },
          stations: { $push: '$stationAlone' },
          subwayFamily: { $first: '$subwayFamily' },
        },
      },
      {
        $unwind: '$stations',
      },
      {
        $unwind: '$stations',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          lineFamily: 1,
          stations: 1,
          image: {
            $filter: {
              input: '$stations.images',
              as: 'image',
              cond: { $eq: ['$$image.line', '$name'] },
            },
          },
        },
      },
      {
        $set: {
          'stations.images': '$image',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          stations: { $push: '$stations' },
          lineFamily: { $first: '$lineFamily' },
        },
      },
      { $sort: { name: 1 } },
    ]);
    console.log({ lines });
    return lines;
  }

  async findByLineFamily2(subwayFamily: SubwayFamily) {
    const lines = await this.lineModel.aggregate([
      {
        $match: { subwayFamily: { $eq: subwayFamily } },
      },
      {
        $unwind: '$stations',
      },
      {
        $lookup: {
          from: 'stations',
          localField: 'stations.station_id',
          foreignField: 'station_id',
          as: 'stationAlone',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          d: { $first: '$name' },
          line_id: { $first: '$line_id' },
          stations: { $push: '$stationAlone' },
          subwayFamily: { $first: '$subwayFamily' },
        },
      },
      {
        $unwind: '$stations',
      },
      {
        $unwind: '$stations',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          lineFamily: 1,
          line_id: 1,
          stations: 1,
          image: {
            $filter: {
              input: '$stations.images',
              as: 'image',
              cond: { $eq: ['$$image.line', '$name'] },
            },
          },
        },
      },
      {
        $set: {
          'stations.images': '$image',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          stations: { $push: '$stations' },
          lineFamily: { $first: '$lineFamily' },
          line_id: { $first: '$line_id' },
        },
      },
      { $sort: { name: 1 } },
    ]);
    console.log({ lines });
    return lines;
  }

  findOne(id: string) {
    return `This action returns a #${id} station`;
  }

  update(id: string, updateStationInput: UpdateStationInput) {
    return `This action updates a #${id} station`;
  }

  remove(id: string) {
    return `This action removes a #${id} station`;
  }

  async insertSeedMxNetwork() {
    await this.stationModel.deleteMany({});
    await this.lineModel.deleteMany({});

    const stationsAux = [];
    const linesAux = [];

    systemSubway.forEach(async ({ line, stations }) => {
      stations.forEach((station) => {
        const i = stationsAux.findIndex((s) => s.name === station.name);

        if (i > 0) {
          stationsAux[i] = {
            ...stationsAux[i],
            images: [
              ...stationsAux[i].images,
              {
                line,
                ...(station?.imageUrl && { image: station?.imageUrl }),
              },
            ],
          };
        } else {
          stationsAux.push({
            ...station,
            station_id: this.generateUniqueID(
              SubwayFamily.Metro_CDMX,
              line,
              station.name,
            ),
            images: [
              {
                line,
                ...(station?.imageUrl && { image: station?.imageUrl }),
              },
            ],
          });
        }
      });
    });

    const newStations = await this.stationModel.insertMany(stationsAux, {
      includeResultMetadata: true,
    });

    systemSubway.forEach(async ({ line, stations }) => {
      const newLine = {
        name: line,
        stations: stations.map((a) => {
          const station = newStations.find((b) => b.name === a.name);
          return {
            _id: station._id,
            station_id: station.station_id,
          };
          // return station.station_id;
        }),
        subwayFamily: SubwayFamily.Metro_CDMX,
        line_id: HashUtilities.generateHashIdLine(
          SubwayFamily.Metro_CDMX,
          line,
        ),
      };

      // console.log(newLine);

      linesAux.push(newLine);
    });
    console.log({ linesAux });
    const newLines = await this.lineModel.insertMany(linesAux);

    return {
      lines: newLines,
      stations: newStations,
    };
  }

  generateUniqueID(subwayFamily: string, line: string, stationName: string) {
    const data = subwayFamily + line + stationName;
    const hash = createHash('sha256').update(data).digest('hex');
    console.log({ hash });
    return hash;
  }
}
