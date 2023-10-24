import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStationInput } from '../dto/create-station.input';
import { UpdateStationInput } from '../dto/update-station.input';
import { Station } from '../entities/station.entity';
import { systemSubway } from '../data/stations';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel(Station.name)
    private readonly stationModel: Model<Station> /* @InjectModel(Line.name) private readonly lineModel: Model<Line>, */,
  ) {}

  create(createStationInput: CreateStationInput) {
    return 'This action adds a new station';
  }

  findAll() {
    return `This action returns all stations`;
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
    // await this.lineModel.deleteMany({});

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

    const newStations = await this.stationModel.insertMany(stationsAux);

    return newStations;
  }
}
