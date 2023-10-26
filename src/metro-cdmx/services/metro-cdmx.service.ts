import { SubwayFamily } from '@app/common/types/enums/line-family.enum';
import { Injectable } from '@nestjs/common';
import { StationsService } from 'src/stations/services/stations.service';
import { CreateMetroCdmxInput } from '../dto/create-metro-cdmx.input';
import { UpdateMetroCdmxInput } from '../dto/update-metro-cdmx.input';

@Injectable()
export class MetroCdmxService {
  constructor(private readonly stationSevice: StationsService) {}

  create(createMetroCdmxInput: CreateMetroCdmxInput) {
    return 'This action adds a new metroCdmx';
  }

  async findAll() {
    /* const lines = await this.lineModel.aggregate([
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
        },
      },
      { $sort: { name: 1 } },
    ]); */

    /*  const lines = await this.lineModel.find({}); */
    // console.log(h);
    const lines = await this.stationSevice.findByLineFamily2(
      SubwayFamily.Metro_CDMX,
    );
    return lines;
  }

  findOne(id: number) {
    return `This action returns a #${id} metroCdmx`;
  }

  update(id: number, updateMetroCdmxInput: UpdateMetroCdmxInput) {
    return `This action updates a #${id} metroCdmx`;
  }

  remove(id: number) {
    return `This action removes a #${id} metroCdmx`;
  }
}
