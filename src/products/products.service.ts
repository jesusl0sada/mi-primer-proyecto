import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repo: Repository<Product>,
    ) { }


    findAll() {
        return this.repo.find({
            order: { id: 'DESC' },
        });
    }
}
